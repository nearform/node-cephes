const WASM_CODE = {};
const WASM_METHODS = {};
for (const [package, { buffer, methods }] of Object.entries(
  require("./cephes.wasm.base64.json")
)) {
  WASM_CODE[package] = Buffer.from(buffer, "base64");
  WASM_METHODS[package] = methods.filter((el) => el.length);
}

const { errorMappings } = require("./utils.js");

const TOTAL_STACK = 1024 * 1024; // 1MB

class CephesWrapper {
  #stack = {};
  #memory = {};
  constructor(sync) {
    // Compile and export program
    if (sync) {
      const program = this._compileSync();
      this._exportPrograms(program);

      // create a dummy compile promise
      this.compiled = Promise.resolve();
    } else {
      // create a singleton compile promise
      this.compiled = this._compileAsync().then((program) =>
        this._exportPrograms(program)
      );
    }
  }

  _AsciiToString(pkg, ptr) {
    let str = "";
    while (1) {
      const ch = this.#memory[pkg][8][ptr++ >> 0];
      if (ch === 0) return str;
      str += String.fromCharCode(ch);
    }
  }

  getWasmImports(pkg) {
    const wasmImports = {
      // memory
      memory: this._wasmMemory,
      STACKTOP: 0,
      STACK_MAX: TOTAL_STACK,

      mtherr: (name /* char* */, code /* int */) => {
        // from mtherr.c
        const codemsg = errorMappings[code] || "unknown error";
        const fnname = this._AsciiToString(pkg, name);
        const message = 'cephes reports "' + codemsg + '" in ' + fnname;

        if (code === 1) {
          throw new RangeError(message);
        } else {
          throw new Error(message);
        }
      },
    };
    return {
      env: wasmImports,
      wasi_snapshot_preview1: wasmImports,
    };
  }
  _compileSync() {
    return Object.fromEntries(
      Object.entries(WASM_CODE).map(([pkg, code]) => [
        pkg,
        new WebAssembly.Instance(
          new WebAssembly.Module(code),
          this.getWasmImports(pkg)
        ),
      ])
    );
  }

  _compileAsync() {
    const entries = Object.entries(WASM_CODE).map(([pkg, code]) =>
      WebAssembly.instantiate(code, this.getWasmImports()).then((result) => [
        pkg,
        result.instance,
      ])
    );

    return Promise.all(entries).then((resolvedEntries) =>
      Object.fromEntries(resolvedEntries)
    );
  }

  _exportPrograms(program) {
    for (const [pkg, methods] of Object.entries(WASM_METHODS)) {
      const _memory = program[pkg].exports.memory;
      this.#memory[pkg] = {
        8: new Int8Array(_memory.buffer),
        16: new Int16Array(_memory.buffer),
        32: new Int32Array(_memory.buffer),
        F32: new Float32Array(_memory.buffer),
        F64: new Float64Array(_memory.buffer),
      };
      this[pkg] = {
        stackAlloc: program[pkg].exports._emscripten_stack_alloc,
        stackRestore: program[pkg].exports._emscripten_stack_restore,
        stackSave: program[pkg].exports.emscripten_stack_get_current,
        writeArrayToMemory: (array, buffer) => {
          this.#memory[pkg][8].set(array, buffer);
        },
        getValue: (ptr, type = "i18") => {
          if (type.charAt(type.length - 1) === "*") {
            type = "i32"; // pointers are 32-bit
          }
          const getValueMapping = {
            i1: () => this.#memory[pkg][1][ptr >> 0],
            i8: () => this.#memory[pkg][8][ptr >> 0],
            i16: () => this.#memory[pkg][16][ptr >> 1],
            i32: () => this.#memory[pkg][32][ptr >> 2],
            i64: () => this.#memory[pkg][32][ptr >> 2],
            float: () => this.#memory[pkg]["F32"][ptr >> 2],
            double: () => this.#memory[pkg]["F64"][ptr >> 3],
          };

          const fn = getValueMapping[type];

          if (!fn) {
            throw new Error("invalid type for getValue: " + type);
          }

          return fn();
        },
      };

      for (const method of methods) {
        this["cephes" + method] = program[pkg].exports[method.slice(1)];
      }
    }
  }
}

module.exports = CephesWrapper;
