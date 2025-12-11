
import { CephesCompiled, type CephesPackage, type CephesPackageName, type Pointer, type PointerType, type TypedArray } from "./cephes-compiled.js";
import { Buffer } from "buffer";

import wasmMap from "./cephes.wasm.base64.json" with { type: "json" };;
import errorMappings from "./errors.json" with { type: "json" };;

type MemorySize = 8 | 16 | 32 | "F32" | "F64"

type WasmCode = { [pkg in CephesPackageName]: BufferSource }
type WasmMethods = { [pkg in CephesPackageName]: string[] }
type WrapperMemory = { [pkg in CephesPackageName]: { [size in MemorySize]: TypedArray } }

const WASM_CODE: WasmCode = {} as WasmCode;

const WASM_METHODS: WasmMethods = {} as WasmMethods

for (const [pkg, { buffer, methods }] of Object.entries(
  wasmMap
)) {
  WASM_CODE[pkg as any as CephesPackageName] = Buffer.from(buffer, "base64");
  WASM_METHODS[pkg as any as CephesPackageName] = methods.filter((el) => el.length);
}


class BaseCephesWrapper extends CephesCompiled {
  #memory: WrapperMemory = {} as WrapperMemory;
  #exported = false;


  _AsciiToString(pkg: CephesPackageName, ptr: Pointer) {
    let str = "";
    while (1) {
      const ch = this.#memory[pkg][8][ptr++ >> 0];
      if (ch === 0) return str;
      str += String.fromCharCode(ch);
    }
  }

  getWasmImports(pkg: CephesPackageName) {
    const wasmImports = {
      mtherr: (name: Pointer /* char* */, code: number /* int */) => {
        // from mtherr.c
        const codemsg = (errorMappings as { [code: string]: string })[String(code)] || "unknown error";
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

  _exportPrograms(program: {
    [name in CephesPackageName]: WebAssembly.Instance;
  }) {
    if (this.#exported) {
      console.warn("This wrapper has already been exported");
      return;
    }
    for (const [pkg, methods] of (Object.entries(WASM_METHODS) as [CephesPackageName, readonly string[]][])) {
      const _memory = program[pkg].exports.memory as WebAssembly.Memory;
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
        writeArrayToMemory: (array: TypedArray, buffer: Pointer) => {
          this.#memory[pkg][8].set(array, buffer);
        },
        getValue: (ptr: number, type: PointerType | 'i18' = "i18") => {
          if (type.charAt(type.length - 1) === "*") {
            type = "i32"; // pointers are 32-bit
          }
          const getValueMapping: { [k in PointerType]: () => number } = {
            i8: () => this.#memory[pkg][8][ptr >> 0],
            i16: () => this.#memory[pkg][16][ptr >> 1],
            i32: () => this.#memory[pkg][32][ptr >> 2],
            i64: () => this.#memory[pkg][32][ptr >> 2],
            float: () => this.#memory[pkg]["F32"][ptr >> 2],
            double: () => this.#memory[pkg]["F64"][ptr >> 3],
          } as const;

          const fn = getValueMapping[type as PointerType]

          if (!fn) {
            throw new Error("invalid type for getValue: " + type);
          }

          return fn();
        },
      } as any as CephesPackage;

      for (const method of methods) {
        (this as any)[("cephes" + method) as keyof BaseCephesWrapper] = program[pkg].exports[method.slice(1)];
      }
    }
    this.#exported = true;
  }
}

export class CephesWrapper extends BaseCephesWrapper {
  constructor() {
    super();
    const programs = Object.fromEntries(
      Object.entries(WASM_CODE).map(([pkg, code]) => [
        pkg,
        new WebAssembly.Instance(
          new WebAssembly.Module(code),
          this.getWasmImports(pkg as CephesPackageName)
        ),
      ])
    );
    this._exportPrograms(programs as any);
  }
}

export class AsyncCephesWrapper extends BaseCephesWrapper {
  constructor() {
    super();
    const thisCephes = (this as AsyncCephesWrapper)
    const compiled = async function () {
      const entries = await Promise.all(
        Object.entries(WASM_CODE).map(([pkg, code]) =>
          WebAssembly.instantiate(code, thisCephes.getWasmImports(pkg as CephesPackageName)).then(
            (result) => [pkg, result.instance]
          )
        )
      );
      const programs = Object.fromEntries(entries);
      thisCephes._exportPrograms(programs as any);
      thisCephes.compiled = Promise.resolve();
    };
    thisCephes.compiled = compiled.bind(this)();
  }
}

