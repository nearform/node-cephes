CEPHES_PACKAGES=cmath bessel cprob ellf misc

CEPHESDIR := cephes
BUILDDIR := build

CPROTOFILES := $(wildcard $(CEPHESDIR)/*/*.c)
GENERATEFILES := $(wildcard $(BUILDDIR)/*.js) $(wildcard $(BUILDDIR)/*.md)
WASMS := $(wildcard cephes-*.wasm)

CFLAGS:=-O2 -g3
LFLAGS:=-O2
ADDITIONAL_FLAGS:=-UHAVE_LONG_DOUBLE -DSTDC_HEADERS=0 -DUNK=1 -DIBMC=1 -DANSIPROT=1
DISABLE_WARNING_FLAGS:=-Wno-deprecated-non-prototype -Wno-incompatible-library-redeclaration -Wno-unused-command-line-argument -Wno-macro-redefined

.PHONY: clean download build test-suite test help

PACKAGE_CALLS = \
    "pkg=cmath" \
    "pkg=bessel additional_sources=\"$(CEPHESDIR)/cprob/gamma.c $(CEPHESDIR)/misc/chbevl.c $(CEPHESDIR)/misc/polevl.c $(CEPHESDIR)/cmath/isnan.c\"" \
    "pkg=cprob additional_sources=\"$(CEPHESDIR)/cmath/isnan.c\"" \
    "pkg=ellf additional_sources=\"$(CEPHESDIR)/cmath/isnan.c\"" \
    "pkg=misc additional_sources=\"$(CEPHESDIR)/cprob/gamma.c $(CEPHESDIR)/cmath/isnan.c $(CEPHESDIR)/cmath/powi.c\""

define run_package_calls
	@for args in $(PACKAGE_CALLS); do \
	    eval make --silent $(1) $$args; \
	done
endef

build: compile-packages src/cephes.wasm.base64.json src/index.ts src/cephes-compiled.ts npm-build README.md # Build the package after downloading

clean: # Remove artifacts from previous build
	@echo "Cleaning files..."
	@rm -f src/cephes.wasm.base64.json src/index.ts src/cephes-compiled.ts index.mjs index.js index.d.ts
	@echo "...done!"

test: test/actual.test.js # Run the tests suite
	@npm test

cephes/: # Create the cephes package folder
	@mkdir -p $(CEPHESDIR)

download: cephes/ # Download the cephes source code, remove unnecessary files
	@mkdir -p $(CEPHESDIR)
	@# downloading cephes packages...
	@for pkg in ${CEPHES_PACKAGES}; do \
		echo "Downloading $$pkg..."; \
		mkdir -p $(CEPHESDIR)/$$pkg; \
		curl --progress-bar -L http://www.netlib.org/cephes/$$pkg.tgz | tar xz -C $(CEPHESDIR)/$$pkg; \
		ls $(CEPHESDIR)/$$pkg | grep -vE '\.([ch])$$' | xargs -I {} rm -f "$(CEPHESDIR)/$$pkg/{}";  \
		echo ""; \
	done

	@echo "#ifndef MCONF_H\n#define MCONF_H" > $(CEPHESDIR)/mconf.h && cat $(CEPHESDIR)/cmath/mconf.h >> $(CEPHESDIR)/mconf.h && echo "#endif" >> $(CEPHESDIR)/mconf.h && mv $(CEPHESDIR)/cmath/mtherr.c $(CEPHESDIR)/mtherr.c && mv $(CEPHESDIR)/cmath/const.c $(CEPHESDIR)/const.c; 

	@# Remove test files and headers
	@rm -rf $(CEPHESDIR)/cmath/mod2pi.c $(CEPHESDIR)/cmath/mtst.c $(CEPHESDIR)/cmath/dtestvec.c $(CEPHESDIR)/ellf/ellf.c $(CEPHESDIR)/misc/revers.c $(CEPHESDIR)/*/*.h $(CEPHESDIR)/*/const.c $(CEPHESDIR)/*/mtherr.c;

	@# Download Readme...
	@echo "Downloading Readme..."
	@curl --progress-bar -L http://www.netlib.org/cephes/cephes.doc > $(CEPHESDIR)/cephes.txt
	@echo ""

	@echo "Formatting files..."
	@# Format source code and headers
	@for src in $(CEPHESDIR)/*.c $(CEPHESDIR)/*.h $(CEPHESDIR)/*/*.c; do \
		clang-format -style=llvm -i $$src ;\
	done
	@echo "...done!"

_compile-package: # Compile individual packages
	@if [ -z "$(pkg)" ]; then \
		echo "Usage: make a pkg=<package>"; \
		exit 1; \
	fi; 
	@echo "Compiling $$pkg..."
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
		$(ADDITIONAL_FLAGS) $(DISABLE_WARNING_FLAGS) \
		--js-library $(BUILDDIR)/c-defs.js \
		$(LFLAGS) $(CEPHESDIR)/$$pkg/*.c $$additional_sources $(CEPHESDIR)/const.c build/malloc_free.bc -I $(CEPHESDIR) -o cephes-$$pkg.js
	@rm -f cephes-$$pkg.js
	
compile-packages: # Compile all packages
	@emcc -c -emit-llvm $(CFLAGS) $(BUILDDIR)/malloc_free.c -o $(BUILDDIR)/malloc_free.bc
	@rm -f src/cephes.wasm.base64.json
	$(call run_package_calls,_compile-package)

src/cephes.wasm.base64.json: $(WASMS) # Merge the wasm files into one json file
	@echo "Generating $@..."
	@node -p "JSON.stringify(Object.fromEntries(['cmath', 'cprob','bessel','ellf', 'misc'].map(pkg => [pkg, {buffer: fs.readFileSync('cephes-'+pkg+'.wasm', 'base64'),methods:fs.readFileSync('cephes-'+pkg+'.txt', 'utf-8').split('\n')}])))" > $@
	@rm -f cephes-*.wasm cephes-*.txt

README.md: $(CEPHESDIR)/cephes.txt $(CPROTOFILES) $(GENERATEFILES) # Create the README file
	@echo "Generating $@..."
	@cat $(BUILDDIR)/readme-header.md > $@
	@cproto -I $(CEPHESDIR) $(CEPHESDIR)/*/*.c | node $(BUILDDIR)/generate-readme-toc.js >> $@
	@cproto -I $(CEPHESDIR) $(CEPHESDIR)/*/*.c | node $(BUILDDIR)/generate-readme-jsdoc.js >> $@
	@cat $(BUILDDIR)/readme-footer.md >> $@

src/index.ts: $(CPROTOFILES) $(GENERATEFILES) # Create the typescript entry point
	@echo "Generating $@..."
	@cproto -I $(CEPHESDIR) $(CEPHESDIR)/*/*.c | node $(BUILDDIR)/generate-ts-interface.js > $@

src/cephes-compiled.ts: $(CPROTOFILES) $(GENERATEFILES) # Create the type definitions for CephesCompiled
	@echo "Generating $@..."
	@cproto -I $(CEPHESDIR) $(CEPHESDIR)/*/*.c | node $(BUILDDIR)/generate-cephes-compiled-interface.js > $@

_test-suite: # Create a test-suite. Note that NaN and Infinity are set as strings which will need to be converted.
	@if [ -z "$(pkg)" ]; then \
		echo "Usage: make a pkg=<package>"; \
		exit 1; \
	fi; 
	@mkdir -p test/cephes_output
	@echo "Creating test suite for $$pkg..."
	@cproto -I $(CEPHESDIR) $(CEPHESDIR)/$$pkg/*.c > test-suite-$$pkg.h;
	@cat test-suite-$$pkg.h | node $(BUILDDIR)/generate-c-tester.js test-suite-$$pkg.h > test-suite-$$pkg.c
	@$(CC) $(ADDITIONAL_FLAGS) $(DISABLE_WARNING_FLAGS) -I $(CEPHESDIR) $(CEPHESDIR)/$$pkg/*.c $(CEPHESDIR)/const.c $$additional_sources test-suite-$$pkg.c -o x && ./x | grep '^{' \
	| sed -E 's/(^|[^A-Za-z0-9_])(NaN|-?Infinity)($|[^A-Za-z0-9_])/\1"\2"\3/g' > cephes-tests-$$pkg.jsonl
	@rm -f x test-suite-*

test-suite: $(CPROTOFILES) $(GENERATEFILES) # Create all tests
	$(call run_package_calls,_test-suite)
	@node -p "const fs=require('fs'); JSON.stringify(['cmath','cprob','bessel','ellf','misc'].map(f=>[f, fs.readFileSync('cephes-tests-'+f+'.jsonl','utf-8').split('\n').filter(l=>l).map(JSON.parse)]).reduce((a,[k,v])=>({...a,[k]:v}),{}))" > test/expected.json
	@rm -f cephes-tests-*.jsonl
	@npm run lint -- test/expected.json

npm-build: # Build the package (index.js, index.mjs, index.d.ts)
	@echo "Building npm package..."
	@npm run prepare

help:
	@echo "Available targets:"
	@awk 'BEGIN {FS=":.*# "} /^[a-zA-Z0-9][a-zA-Z0-9_-]*:.*# / && $$1 !~ /^_/ {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)
