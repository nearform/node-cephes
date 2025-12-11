const stream = require("stream");
const reader = require("./reader.js");

const nodeNumbers = { double: "number", int: "number" };

const header = `
export type TypedArray =
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Float32Array
  | Float64Array;
export type Pointer = number
export type PointerType = "i8" | "i16" | "i32" | "i64" | "float" | "double"
export interface CephesPackage {
  stackSave: () => number
  stackRestore: (ptr: Pointer) => void
  stackAlloc: (n: number) => Pointer
  writeArrayToMemory: (arr: TypedArray, p: Pointer) => void
  getValue: (ptr: Pointer, type: PointerType) => number
}
export class CephesCompiled {
  compiled?: Promise<void>
`;

class InterfaceGenerator extends stream.Transform {
  #packages = new Set();
  constructor() {
    super({ objectMode: true });
    this.push(header);
  }

  _transform(data, encoding, done) {
    const {
      filename,
      returnType,
      functionName,
      functionArgs,
      package: packageName,
    } = data;

    // Check if the stack will be needed because of isPointer or isArray
    const needStack = functionArgs.some((arg) => arg.isArray || arg.isPointer);

    // Check if there is extra data returned
    const extraReturn = functionArgs.some((arg) => arg.isPointer);

    //
    // Start code generation
    //
    let code = "";
    if (!this.#packages.has(packageName)) {
      code += `  ${packageName}!: CephesPackage\n`;
      this.#packages.add(packageName);
    }
    //
    // function header
    //

    // function name
    code += `  // from cephes/${packageName}/${filename}.c\n`;
    code += `  cephes_${functionName}!: (`;
    // function arguments
    for (const { type, isPointer, isArray, name } of functionArgs) {
      // if (isPointer) continue;
      code += `${name}: ${
        isArray || isPointer ? "Pointer" : (nodeNumbers[type] ?? type)
      }, `;
    }
    // Remove training comma
    code = code.slice(0, -2);
    // finish function header
    code += `)=>`;

    code += `${nodeNumbers[returnType]};\n`;

    code += "\n";
    done(null, code);
  }
  _flush(done) {
    this.push("}\n");
    this.push(
      `export type CephesPackageName = "${[...this.#packages].join('" | "')}"`,
    );
    done();
  }
}

process.stdin
  .pipe(reader())
  .pipe(new InterfaceGenerator())
  .pipe(process.stdout);
