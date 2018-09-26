
const fs = require('fs');

const TOTAL_STACK = 1024 * 1024; // 1MB
const TOTAL_MEMORY = 1024 * 1024; // 1MB
const WASM_PAGE_SIZE = 64 * 1024; // Defined in WebAssembly specs

// This must be brfs friendly -- see https://github.com/browserify/brfs
const WASM_CODE = fs.readFileSync(__dirname + '/cephes.wasm');

class CephesWrapper {
  constructor(sync) {
    // Initialize the runtime's memory
    this._wasmMemory = new WebAssembly.Memory({
      'initial': TOTAL_MEMORY / WASM_PAGE_SIZE,
      'maximum': TOTAL_MEMORY / WASM_PAGE_SIZE
    });

    this._HEAP8 = new Int8Array(this._wasmMemory.buffer);
    this._HEAP16 = new Int16Array(this._wasmMemory.buffer);
    this._HEAP32 = new Int32Array(this._wasmMemory.buffer);
    this._HEAPF32 = new Float32Array(this._wasmMemory.buffer);
    this._HEAPF64 = new Float64Array(this._wasmMemory.buffer);

    // Compile and export program
    if (sync) {
      // compile synchronously
      const program = this._compileSync();
      this._exportProgram(program);

      // create a dummy compile promise
      this.compiled = Promise.resolve();
    } else {
      // create a singleton compile promise
      this.compiled = this._compileAsync()
        .then((program) => this._exportProgram(program));
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
    let codemsg = '';
    switch (code) {
      case 1: codemsg = 'argument domain error'; break;
      case 2: codemsg = 'function singularity'; break;
      case 3: codemsg = 'overflow range error'; break;
      case 4: codemsg = 'underflow range error'; break;
      case 5: codemsg = 'total loss of precision'; break;
      case 6: codemsg = 'partial loss of precision'; break;
      case 33: codemsg = 'Unix domain error code'; break;
      case 34: codemsg = 'Unix range error code'; break;
      default: codemsg = 'unknown error';
    }

    const fnname = this._AsciiToString(name);
    const message = 'cephes reports "' + codemsg + '" in ' + fnname;

    // Restore stack to the STACKTOP before throwing. This only works because
    // all the exported cephes functions are plain functions.
    this.stackRestore(0);

    if (code == 1) {
      throw new RangeError(message);
    } else {
      throw new Error(message);
    }
  }

  _wasmImports() {
    return {
      'env': {
        // cephes error handler
        "_mtherr": this._mtherr.bind(this),

        // memory
        "memory": this._wasmMemory,
        "STACKTOP": 0,
        "STACK_MAX": TOTAL_STACK
      }
    };
  }

  _compileSync() {
    return new WebAssembly.Instance(
      new WebAssembly.Module(WASM_CODE),
      this._wasmImports()
    );
  }

  _compileAsync() {
    return WebAssembly.instantiate(
      WASM_CODE,
      this._wasmImports()
    ).then((results) => results.instance);
  }

  _exportProgram(program) {
    // export cephes functions
    for (const key of Object.keys(program.exports)) {
      if (key.startsWith('_cephes_')) {
        this[key] = program.exports[key];
      }
    }

    // export special stack functions
    this.stackAlloc = program.exports.stackAlloc;
    this.stackRestore = program.exports.stackRestore;
    this.stackSave = program.exports.stackSave;
  }

  // export helper functions
  getValue(ptr, type) {
    type = type || 'i8';
    if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
      switch(type) {
        case 'i1': return this._HEAP8[((ptr)>>0)];
        case 'i8': return this._HEAP8[((ptr)>>0)];
        case 'i16': return this._HEAP16[((ptr)>>1)];
        case 'i32': return this._HEAP32[((ptr)>>2)];
        case 'i64': return this._HEAP32[((ptr)>>2)];
        case 'float': return this._HEAPF32[((ptr)>>2)];
        case 'double': return this._HEAPF64[((ptr)>>3)];
        default: throw new Error('invalid type for getValue: ' + type);
      }
    return null;
  }

  writeArrayToMemory(array, buffer) {
    this._HEAP8.set(array, buffer);
  }
}

module.exports = CephesWrapper;
