
CEPHESDIR := cephes
OBJS := $(patsubst %.c,%.bc,$(wildcard $(CEPHESDIR)/*.c))
FLAGS := -O1 -g3

.PHONY: download build index.js

build: index.js
all: download build

clean:
	rm -f $(OBJS)

cephes/:
	mkdir cephes

download: | cephes/
	rm -f $(CEPHESDIR)/*

	@# Download main library
	curl http://www.netlib.org/cephes/cmath.tgz | tar xz -C $(CEPHESDIR)

	@# Download cprob extension
	curl http://www.netlib.org/cephes/cprob.tgz | tar xz -C $(CEPHESDIR)

	@# Download ellf extension
	curl http://www.netlib.org/cephes/ellf.tgz | tar xz -C $(CEPHESDIR)

	@# Download bessel extension
	curl http://www.netlib.org/cephes/bessel.tgz | tar xz -C $(CEPHESDIR)

	@# Download misc extension
	curl http://www.netlib.org/cephes/misc.tgz | tar xz -C $(CEPHESDIR)

	@# Remove compile files and instructions
	cd $(CEPHESDIR) && \
		rm -f *.mak *.MAK *.bat msc.rsp descrip.mms README *.doc \
		protos.h

	@# remove math functions that are too basic
	cd $(CEPHESDIR) && rm -f \
		acosh.c asin.c asinh.c atan.c atanh.c clog.c cmplx.c cosh.c \
		drand.c dtestvec.c exp.c fabs.c floor.c ftilib.* isnan.c log.c log2.c \
		log10.c mod2pi.c mtst.* polevl.asm pow.c setprbor.asm \
		setprec.* setprelf.* sin.c sincos.c sinh.c sqrt.c tan.c tanh.c

	@# remove math functions that are too complicated to deal with
	cd $(CEPHESDIR) && rm -f ELLF.* ellf.* revers.c simpsn.c

	@# remove mtherr.c error handling file, this is reimplemented in JavaScript
	@# see the c-defs.js file.
	cd $(CEPHESDIR) && rm -f mtherr.c

	@# Configure cephes
	sed -i '' -e 's/define HAVE_LONG_DOUBLE 1/define HAVE_LONG_DOUBLE 0/g' $(CEPHESDIR)/mconf.h
	sed -i '' -e 's/define STDC_HEADERS 1/define STDC_HEADERS 0/g' $(CEPHESDIR)/mconf.h
	sed -i '' -e 's/define HAVE_STRING_H 1/define HAVE_STRING_H 0/g' $(CEPHESDIR)/mconf.h

	@# Make sure we don't depend on endians by removing the define
	sed -i '' -e 's/define BIGENDIAN 1/pragma/g' $(CEPHESDIR)/mconf.h
	sed -i '' -e 's/define BIGENDIAN 0/pragma/g' $(CEPHESDIR)/mconf.h

	@# Create renaming defs to prevent conflict with default symbols
	echo '#ifndef CEPHES_NAMES_H' >> $(CEPHESDIR)/cephes_names.h
	echo '#define CEPHES_NAMES_H' >> $(CEPHESDIR)/cephes_names.h
	echo '' >> $(CEPHESDIR)/cephes_names.h
	cproto $(CEPHESDIR)/*.c | sed -E 's/^(int|double) ([a-z0-9]+)[^\;]+;$$/#define \2 cephes_\2/g' >> $(CEPHESDIR)/cephes_names.h
	echo '' >> $(CEPHESDIR)/cephes_names.h
	echo '#endif' >> $(CEPHESDIR)/cephes_names.h

	@# Add include for cephes_names.h statement to mconf.h
	echo '' >> $(CEPHESDIR)/mconf.h
	echo '/* rename defs to prevent conflict with default symbols */' >> $(CEPHESDIR)/mconf.h
	echo '#include "cephes_names.h"' >> $(CEPHESDIR)/mconf.h

%.bc: %.c $(CEPHESDIR)/cephes_names.h $(CEPHESDIR)/mconf.h
	@# Format the file so it looks readable
	clang-format -style=llvm -i $<

	@# Insert missing #include "mconf.h"
	@if ! grep -q '#include "mconf.h"' $<; then \
		printf '%s\n%s\n' '#include "mconf.h"' "$$(cat $<)" > $<; \
		echo "Inserted missing mconf.h"; \
	fi

	@# Compile
	emcc $(FLAGS) $< -o $@

cephes.js: $(OBJS)
	emcc \
		-s BINARYEN_ASYNC_COMPILATION=0 \
		-s EXPORTED_FUNCTIONS="[$(shell \
			cat $(CEPHESDIR)/cephes_names.h | \
			grep cephes_ | \
			sed -E "s/^#define ([a-z0-9]+) (cephes_[a-z0-9]+)$$/'_\2'/g" | \
			tr '\n' ','  | \
			sed 's/,$$//' \
		)]" \
		-s EXTRA_EXPORTED_RUNTIME_METHODS="['writeArrayToMemory', 'stackAlloc', 'stackSave', 'stackRestore', 'getValue']" \
		-s TOTAL_MEMORY=1MB \
		-s TOTAL_STACK=1MB \
		--js-library build/c-defs.js \
		$(FLAGS) $(OBJS) -o cephes.js

index.js: cephes.js
	cproto $(CEPHESDIR)/*.c | grep cephes_ | node build/generate-index.js > index.js
