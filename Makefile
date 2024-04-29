
CEPHESDIR := cephes
BUILDDIR := build
JS_OBJS := $(patsubst %.c,%.bc,$(wildcard $(CEPHESDIR)/*.c)) build/malloc_free.bc
C_OBJS := $(patsubst %.c,%.o,$(wildcard $(CEPHESDIR)/*.c)) test/expected.o
CPROTOFILES := $(wildcard $(CEPHESDIR)/*.c)
GENERATEFILES := $(wildcard $(BUILDDIR)/*.js) $(wildcard $(BUILDDIR)/*.md)

CFLAGS:=-O2 -g3
LFLAGS:=-O3 -g3

.PHONY: download build test

build: index.js cephes.wasm.base64.json README.md

clean:
	rm -f $(JS_OBJS)
	rm -f $(C_OBJS)
	rm -f cephes.wasm cephes.wast
	rm -f index.js

test: test/expected.json test/actual.test.js
	npm test

cephes/:
	mkdir cephes

download: | cephes/
	rm -f $(CEPHESDIR)/*

	@# Download main library
	curl -L http://www.netlib.org/cephes/cmath.tgz | tar xz -C $(CEPHESDIR)

	@# Download cprob extension
	curl -L http://www.netlib.org/cephes/cprob.tgz | tar xz -C $(CEPHESDIR)

	@# Download ellf extension
	curl -L http://www.netlib.org/cephes/ellf.tgz | tar xz -C $(CEPHESDIR)

	@# Download bessel extension
	curl -L http://www.netlib.org/cephes/bessel.tgz | tar xz -C $(CEPHESDIR)

	@# Download misc extension
	curl -L http://www.netlib.org/cephes/misc.tgz | tar xz -C $(CEPHESDIR)

	@# Download documentation
	curl -L http://www.netlib.org/cephes/cephes.doc > $(CEPHESDIR)/cephes.txt

	@# Remove compile files and instructions
	cd $(CEPHESDIR) && \
		rm -f *.mak *.MAK *.bat msc.rsp descrip.mms README *.doc protos.h ftilib.*

	@# remove math functions that are too complicated to deal with
	cd $(CEPHESDIR) && rm -f \
		clog.c cmplx.c mod2pi.c drand.c dtestvec.c mtst.* polevl.asm setprbor.asm \
		setprec.* setprelf.* ELLF.* ellf.* revers.c simpsn.c

	@# remove mtherr.c error handling file, this is reimplemented in JavaScript
	@# see the c-defs.js file.
	cd $(CEPHESDIR) && rm -f mtherr.c

	@# remove math functions that are too basic, as they are implemented natively
	@# in WebAssembly (f64.abs, and f64.sqrt).
	cd $(CEPHESDIR) && rm -f \
		fabs.c sqrt.c

	@# Rename (effectively remove) ceil, floor as they have native
	@# WebAssembly equivalents (f64.ceil, and f64.floor).
	@# It will continue to contain defintions for frexp, and ldexp
	clang-rename \
		-qualified-name=ceil -new-name=ignore_ceil \
		-qualified-name=floor -new-name=ignore_floor \
		-i $(CEPHESDIR)/floor.c

	@# Exit make
	exit

	@# Configure cephes
	sed -i '' -e 's/define HAVE_LONG_DOUBLE 1/define HAVE_LONG_DOUBLE 0/g' $(CEPHESDIR)/mconf.h
	sed -i '' -e 's/define STDC_HEADERS 1/define STDC_HEADERS 0/g' $(CEPHESDIR)/mconf.h
	sed -i '' -e 's/define HAVE_STRING_H 1/define HAVE_STRING_H 0/g' $(CEPHESDIR)/mconf.h
	sed -i '' -e 's%#define UNK 1%/* #define UNK 1 */%g' $(CEPHESDIR)/mconf.h
	sed -i '' -e 's%/\* #define IBMPC 1 \*/%#define IBMPC 1%g' $(CEPHESDIR)/mconf.h

	@# Create renaming defs to prevent conflict with default symbols
	echo '#ifndef CEPHES_NAMES_H' > $(CEPHESDIR)/cephes_names.h
	echo '#define CEPHES_NAMES_H' >> $(CEPHESDIR)/cephes_names.h
	echo '' >> $(CEPHESDIR)/cephes_names.h
	cproto $(CEPHESDIR)/*.c | \
		grep -v 'ignore_' | \
		sed -E 's/^(int|double) ([a-z0-9_]+)[^\;]+;$$/#define \2 cephes_\2/g' \
		>> $(CEPHESDIR)/cephes_names.h
	echo '' >> $(CEPHESDIR)/cephes_names.h
	echo '#endif' >> $(CEPHESDIR)/cephes_names.h

	@# Add include for cephes_names.h statement to mconf.h
	echo '' >> $(CEPHESDIR)/mconf.h
	echo '/* rename defs to prevent conflict with default symbols */' >> $(CEPHESDIR)/mconf.h
	echo '#include "cephes_names.h"' >> $(CEPHESDIR)/mconf.h

	@# Create proto header file
	echo '#ifndef CEPHES_H' > $(CEPHESDIR)/cephes.h
	echo '#define CEPHES_H' >> $(CEPHESDIR)/cephes.h
	echo '' >> $(CEPHESDIR)/cephes_names.h
	cproto $(CEPHESDIR)/*.c | grep -v 'ignore_' >> $(CEPHESDIR)/cephes.h
	echo '' >> $(CEPHESDIR)/cephes_names.h
	echo '#endif' >> $(CEPHESDIR)/cephes.h

%.bc: %.c $(CEPHESDIR)/cephes_names.h $(CEPHESDIR)/mconf.h
	@# Format the file so it looks readable
	clang-format -style=llvm -i $<

	@# Insert missing #include "mconf.h"
	@if ! grep -q '#include "mconf.h"' $<; then \
		printf '%s\n%s\n' '#include "mconf.h"' "$$(cat $<)" > $<; \
		echo "Inserted missing mconf.h"; \
	fi

	@# Compile
	emcc -c -emit-llvm $(CFLAGS) $< -o $@

%.o: %.c $(CEPHESDIR)/cephes_names.h $(CEPHESDIR)/mconf.h
	@# Insert missing #include "mconf.h"
	@if ! grep -q '#include "mconf.h"' $<; then \
		printf '%s\n%s\n' '#include "mconf.h"' "$$(cat $<)" > $<; \
		echo "Inserted missing mconf.h"; \
	fi

	@# Compile
	$(CC) $(CFLAGS) -c $< -o $@

cephes.wasm: $(JS_OBJS)
	emcc \
		-s BINARYEN_ASYNC_COMPILATION=0 \
		-s EXPORTED_FUNCTIONS="[$(shell \
			cat $(CEPHESDIR)/cephes_names.h | \
			grep cephes_ | \
			sed -E "s/^#define ([a-z0-9]+) (cephes_[a-z0-9]+)$$/'_\2'/g" | \
			tr '\n' ','  | \
			sed 's/,$$//' \
		)]" \
		-s EXPORTED_RUNTIME_METHODS="['writeArrayToMemory', 'stackAlloc', 'stackSave', 'stackRestore', 'getValue']" \
		-s DEFAULT_LIBRARY_FUNCS_TO_INCLUDE="[]" \
		-s TOTAL_MEMORY=2MB \
		-s TOTAL_STACK=1MB \
		-s NO_FILESYSTEM=1 \
		-s ENVIRONMENT='node' \
		-s NODEJS_CATCH_EXIT=0 \
		-s INVOKE_RUN=0 \
		-s DISABLE_EXCEPTION_CATCHING=1 \
		-s ASSERTIONS=0 \
		--js-library $(BUILDDIR)/c-defs.js \
		$(LFLAGS) $^ -o cephes-temp.js
	rm cephes-temp.js
	mv cephes-temp.wasm cephes.wasm

cephes.standalone.wasm: $(JS_OBJS)
	@# Work In Progress: try and use the SIDE_MODULE options for a more
	@# documented approach to stripping out the large and problematic
	@# emscripten cephes.js file.
	emcc \
		-s BINARYEN_ASYNC_COMPILATION=0 \
		-s EXPORTED_FUNCTIONS="[$(shell \
			cat $(CEPHESDIR)/cephes_names.h | \
			grep cephes_ | \
			sed -E "s/^#define ([a-z0-9]+) (cephes_[a-z0-9]+)$$/'_\2'/g" | \
			tr '\n' ','  | \
			sed 's/,$$//' \
		)]" \
		-s SIDE_MODULE=1 \
		--js-library $(BUILDDIR)/c-defs.js \
		$(LFLAGS) $^ -o $@

cephes.wasm.base64.json: cephes.wasm
	node -p "JSON.stringify(fs.readFileSync('$^', 'base64'))" > $@
	rm cephes.wasm

index.js: cephes.wasm $(CPROTOFILES) $(GENERATEFILES)
	cproto $(CEPHESDIR)/*.c | grep -v ignore_ | node $(BUILDDIR)/generate-interface.js > index.js

README.md: $(CEPHESDIR)/cephes.txt $(CPROTOFILES) $(GENERATEFILES)
	cat $(BUILDDIR)/readme-header.md > README.md
	cproto $(CEPHESDIR)/*.c | grep -v ignore_ | node $(BUILDDIR)/generate-readme-toc.js >> README.md
	cproto $(CEPHESDIR)/*.c | grep -v ignore_ | node $(BUILDDIR)/generate-readme-jsdoc.js >> README.md
	cat $(BUILDDIR)/readme-footer.md >> README.md
