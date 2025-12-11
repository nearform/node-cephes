CEPHES_PACKAGES=cmath bessel cprob ellf misc

CEPHESDIR := cephes
BUILDDIR := build

CPROTOFILES := $(wildcard $(CEPHESDIR)/*/*.c)
GENERATEFILES := $(wildcard $(BUILDDIR)/*.js) $(wildcard $(BUILDDIR)/*.md)
WASMS := $(wildcard cephes-*.wasm)

CFLAGS:=-O2 -g3
LFLAGS:=-O2

.PHONY: download build test

build: compile-packages cephes.wasm.base64.json index.js index.mjs README.md

clean:
	rm -f $(JS_OBJS)
	rm -f $(C_OBJS)
	rm -f cephes.wasm cephes.wast
	rm -f index.mjs index.js

test: test/expected.json test/actual.test.js
	npm test

cephes/:
	mkdir -p $(CEPHESDIR)

download: 
	rm -rf $(CEPHESDIR)
	mkdir -p $(CEPHESDIR)
	@# downloading cephes packages...
	@for pkg in ${CEPHES_PACKAGES}; do \
		echo "Downloading $$pkg..."; \
		mkdir -p $(CEPHESDIR)/$$pkg; \
		curl -L http://www.netlib.org/cephes/$$pkg.tgz | tar xz -C $(CEPHESDIR)/$$pkg; \
		ls $(CEPHESDIR)/$$pkg | grep -vE '\.([ch])$$' | xargs -I {} rm -f "$(CEPHESDIR)/$$pkg/{}";  \
	done

	echo "#ifndef MCONF_H\n#define MCONF_H" > $(CEPHESDIR)/mconf.h && cat $(CEPHESDIR)/cmath/mconf.h >> $(CEPHESDIR)/mconf.h && echo "#endif" >> $(CEPHESDIR)/mconf.h && mv $(CEPHESDIR)/cmath/mtherr.c $(CEPHESDIR)/mtherr.c && mv $(CEPHESDIR)/cmath/const.c $(CEPHESDIR)/const.c; 

	@# Remove test files and headers
	@rm -rf $(CEPHESDIR)/cmath/mod2pi.c $(CEPHESDIR)/cmath/mtst.c $(CEPHESDIR)/cmath/dtestvec.c $(CEPHESDIR)/ellf/ellf.c $(CEPHESDIR)/misc/revers.c $(CEPHESDIR)/*/*.h $(CEPHESDIR)/*/const.c $(CEPHESDIR)/*/mtherr.c;

	@# Download Readme...
	curl -L http://www.netlib.org/cephes/cephes.doc > $(CEPHESDIR)/cephes.txt

	@# Format source code and headers
	@for src in $(CEPHESDIR)/*.c $(CEPHESDIR)/*.h $(CEPHESDIR)/*/*.c; do \
		clang-format -style=llvm -i $$src ;\
	done

_compile-package: 
	@if [ -z "$(pkg)" ]; then \
		echo "Usage: make a pkg=<package>"; \
		exit 1; \
	fi; 
	exports=$$( \
		cproto -I $(CEPHESDIR) $(CEPHESDIR)/$${pkg}/*.c \
		| sed -E 's/^(\/).+//g' \
		| sed '/^$$/d' \
		| sed -E 's/^([^ ]+)[[:space:]]*([^ \(]+).*;/_\2/g' \
		| tr '\n' ',' \
		| sed 's/,$$//' \
	); \
	echo "$$exports" | tr ',' '\n' > cephes-$$pkg.txt; \
	emcc \
		-s BINARYEN_ASYNC_COMPILATION=0 \
		-s EXPORTED_FUNCTIONS="[$$exports]" \
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
		-UHAVE_LONG_DOUBLE -USTDC_HEADERS -DUNK=1 -DIBMC=1 -DANSIPROT=1 \
		--js-library $(BUILDDIR)/c-defs.js \
		$(LFLAGS) $(CEPHESDIR)/$$pkg/*.c $$additional_sources $(CEPHESDIR)/const.c build/malloc_free.bc -I $(CEPHESDIR) -o cephes-$$pkg.js
	rm -f cephes-$$pkg.js
	

compile-packages:
	@emcc -c -emit-llvm $(CFLAGS) $(BUILDDIR)/malloc_free.c -o $(BUILDDIR)/malloc_free.bc
	@rm -f cephes.wasm.base64.json
	@make --silent _compile-package pkg=cmath
	@make --silent _compile-package pkg=bessel additional_sources="$(CEPHESDIR)/cprob/gamma.c $(CEPHESDIR)/misc/chbevl.c $(CEPHESDIR)/misc/polevl.c $(CEPHESDIR)/cmath/isnan.c"
	@make --silent _compile-package pkg=cprob additional_sources="$(CEPHESDIR)/cmath/isnan.c"
	@make --silent _compile-package pkg=ellf additional_sources="$(CEPHESDIR)/cmath/isnan.c"
	@make --silent _compile-package pkg=misc additional_sources="$(CEPHESDIR)/cprob/gamma.c $(CEPHESDIR)/cmath/isnan.c  $(CEPHESDIR)/cmath/powi.c"

cephes.wasm.base64.json: $(WASMS)
	@node -p "JSON.stringify(Object.fromEntries(['cmath', 'cprob','bessel','ellf', 'misc'].map(pkg => [pkg, {buffer: fs.readFileSync('cephes-'+pkg+'.wasm', 'base64'),methods:fs.readFileSync('cephes-'+pkg+'.txt', 'utf-8').split('\n')}])))" > $@
	rm -f cephes-*.wasm
	rm -f cephes-*.txt
	
index.js: $(CPROTOFILES) $(GENERATEFILES)
	cproto -I $(CEPHESDIR) $(CEPHESDIR)/*/*.c | node $(BUILDDIR)/generate-interface.js > $@
	
index.mjs:
	npx rollup -c 

README.md: $(CEPHESDIR)/cephes.txt $(CPROTOFILES) $(GENERATEFILES)
	cat $(BUILDDIR)/readme-header.md > $@
	cproto -I $(CEPHESDIR) $(CEPHESDIR)/*/*.c | node $(BUILDDIR)/generate-readme-toc.js >> $@
	cproto -I $(CEPHESDIR) $(CEPHESDIR)/*/*.c | node $(BUILDDIR)/generate-readme-jsdoc.js >> $@
	cat $(BUILDDIR)/readme-footer.md >> $@
