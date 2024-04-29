const WASM_CODE = Buffer.from(require('./cephes.wasm.base64.json'), 'base64');
const {errorMappings} = require('./utils.js');

const TOTAL_STACK = 1024 * 1024; // 1MB

class CephesWrapper {
  constructor(sync) {
    // Compile and export program
    if (sync) {
      const program = this._compileSync();
      this._exportProgram(program);

      // create a dummy compile promise
      this.compiled = Promise.resolve();
    } else {
      // create a singleton compile promise
      this.compiled = this._compileAsync().then((program) => this._exportProgram(program));
    }
  }

  _AsciiToString(ptr) {
    let str = '';
    while (1) {
      const ch = this._HEAP8[((ptr++)>>0)];
      if (ch === 0) return str;
      str += String.fromCharCode(ch);
    }
  }

  _mtherr(name /* char* */, code /* int */) {
    // from mtherr.c
    const codemsg = errorMappings[code] || 'unknown error';
    const fnname = this._AsciiToString(name);
    const message = 'cephes reports "' + codemsg + '" in ' + fnname;

    if (code === 1) {
      throw new RangeError(message);
    } else {
      throw new Error(message);
    }
  }

  _wasmImports() {
    return {
      env: {
        // cephes error handler
        mtherr: this._mtherr.bind(this),

        // memory
        memory: this._wasmMemory,
        STACKTOP: 0,
        STACK_MAX: TOTAL_STACK
      }
    };
  }

  _compileSync() {
    return new WebAssembly.Instance(new WebAssembly.Module(WASM_CODE), this._wasmImports());
  }

  _compileAsync() {
    return WebAssembly.instantiate(WASM_CODE, this._wasmImports()).then(results => results.instance);
  }

  _exportProgram(program) {
    // export cephes functions
    for (const key of Object.keys(program.exports)) {
      if (key.startsWith('cephes_')) {
        this[key] = program.exports[key];
      }
    }

    // export special stack functions
    this.stackAlloc = program.exports._emscripten_stack_alloc;
    this.stackRestore = program.exports._emscripten_stack_restore;
    this.stackSave = program.exports.emscripten_stack_get_current;

    // export memory
    this._wasmMemory = program.exports.memory;

    this._HEAP8 = new Int8Array(this._wasmMemory.buffer);
    this._HEAP16 = new Int16Array(this._wasmMemory.buffer);
    this._HEAP32 = new Int32Array(this._wasmMemory.buffer);
    this._HEAPF32 = new Float32Array(this._wasmMemory.buffer);
    this._HEAPF64 = new Float64Array(this._wasmMemory.buffer);
  }

  // export helper functions
  getValue(ptr, type = 'i18') {
    if (type.charAt(type.length-1) === '*') {
      type = 'i32'; // pointers are 32-bit
    }
    const getValueMapping = {
      i1: () => this._HEAP8[((ptr)>>0)],
      i8: () => this._HEAP8[((ptr)>>0)],
      i16: () => this._HEAP16[((ptr)>>1)],
      i32: () => this._HEAP32[((ptr)>>2)],
      i64: () => this._HEAP32[((ptr)>>2)],
      float: () => this._HEAPF32[((ptr)>>2)],
      double: () => this._HEAPF64[((ptr)>>3)],
    }

    const fn = getValueMapping[type];

    if (!fn) {
      throw new Error('invalid type for getValue: ' + type);
    }

    return fn();
  }

  writeArrayToMemory(array, buffer) {
    this._HEAP8.set(array, buffer);
  }
}

module.exports = CephesWrapper;
