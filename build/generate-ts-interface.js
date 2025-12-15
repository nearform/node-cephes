const stream = require("stream");
const reader = require("./reader.js");

const type2llvm = {
  double: "double",
  int: "i32",
};

const argGenerators = {
  double: function (packageName, name, needStack) {
    let code = "";
    code += `  // argument: double ${name}\n`;
    code += `  if (typeof ${name} !== 'number') {\n`;
    if (needStack)
      code += `    cephes.${packageName}.stackRestore(stacktop);\n`;
    code += `    throw new TypeError('${name} must be a number');\n`;
    code += `  }\n`;
    code += `  const carg_${name} = ${name};\n`;
    return code;
  },

  int: function (packageName, name, needStack) {
    let code = "";
    code += `  // argument: int ${name}\n`;
    code += `  if (typeof ${name} !== 'number') {\n`;
    if (needStack)
      code += `    cephes.${packageName}.stackRestore(stacktop);\n`;
    code += `    throw new TypeError('${name} must be a number');\n`;
    code += `  }\n`;
    code += `  const carg_${name} = ${name} | 0;\n`;
    return code;
  },

  "double*": function (packageName, name) {
    let code = "";
    code += `  // argument: double* ${name}\n`;
    code += `  const carg_${name} = cephes.${packageName}.stackAlloc(8); // No need to zero-set it.\n`;
    return code;
  },

  "int*": function (packageName, name) {
    let code = "";
    code += `  // argument: int* ${name}\n`;
    code += `  const carg_${name} = cephes.${packageName}.stackAlloc(4); // No need to zero-set it.\n`;
    return code;
  },

  "double[]": function (packageName, name, needStack) {
    let code = "";
    code += `  // argument: double[] ${name}\n`;
    code += `  if (!(${name} instanceof Float64Array)) {\n`;
    if (needStack)
      code += `    cephes.${packageName}.stackRestore(stacktop);\n`;
    code += `    throw new TypeError('${name} must be either a Float64Array');\n`;
    code += `  }\n`;
    code += `  const carg_${name} = cephes.${packageName}.stackAlloc(${name}.length << 3);\n`;
    code += `  cephes.${packageName}.writeArrayToMemory(new Uint8Array(${name}.buffer, ${name}.byteOffset, ${name}.byteLength), carg_${name});\n`;
    return code;
  },
  Complex: function (packageName, name, needStack) {
    let code = "";
    code += `  // argument: Complex ${name}\n`;
    code += `  if (!isComplex(${name})) {\n`;
    if (needStack)
      code += `    cephes.${packageName}.stackRestore(stacktop);\n`;
    code += `    throw new TypeError('${name} must be a Complex');\n`;
    code += `  }\n`;
    code += `  const carg_${name} = cephes.${packageName}.stackAlloc(16);\n`;
    code += `  const ${name}Buffer = new Float64Array([${name}.real, ${name}.imag]);\n`;
    code += `  cephes.${packageName}.writeArrayToMemory(new Uint8Array(${name}Buffer.buffer, ${name}Buffer.byteOffset, ${name}Buffer.byteLength), carg_${name});\n`;
    return code;
  },
};

const header = `
import cephes from './cephes.js';
import {isComplex, type Complex, create as createComplex} from "./complex.js"

// Export compiled promise, in Node.js this is just a dummy promise as the
// WebAssembly program will be compiled synchronously. It takes about 20ms
// as of Node.js v10.6.1.
export const compiled = cephes.compiled ?? Promise.resolve()
export { createComplex };
`;

class InterfaceGenerator extends stream.Transform {
  #functions = [];
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
    const needStack = functionArgs.some(
      (arg) => arg.isArray || arg.isPointer || arg.type === "Complex",
    );
    const usesComplex = functionArgs.some((arg) => arg.type === "Complex");
    // Check if there is extra data returned
    const extraReturn = functionArgs.some((arg) => arg.isPointer);

    //
    // Start code generation
    //
    let code = "";

    // function name
    code += `// from cephes/${packageName}/${filename}.c\n`;
    code += `export function ${functionName}(`;
    // function arguments
    for (const { type, isPointer, isArray, name } of functionArgs) {
      if (isPointer) continue;
      if (isArray) {
        switch (type) {
          case "double":
            code += `${name}: Float64Array, `;
            break;
          default:
            throw `Unknown type ${type}`;
        }
      } else {
        code += `${name}: ${
          { double: "number", int: "number" }[type] ?? type
        }, `;
      }
    }
    // Remove training comma
    code = code.slice(0, -2);
    // finish function header
    code += `) {\n`;

    if (needStack) {
      code +=
        "  //Save the STACKTOP because the following code will do some stack allocs\n";
      code += `  const stacktop = cephes.${packageName}.stackSave();\n`;
      code += "\n";
    }

    //
    // function arguments
    //
    for (const { fullType, name } of functionArgs) {
      code += argGenerators[fullType](packageName, name, needStack);
      code += "\n";
    }

    //
    // function call
    //
    code += `  // return: ${returnType}\n`;
    // function call
    code += `  ${
      returnType !== "void" ? "const fn_ret = " : ""
    }cephes.cephes_${functionName}(`;
    // function arguments
    for (const { name } of functionArgs) {
      code += `carg_${name}, `;
    }
    // Remove training comma
    code = code.slice(0, -2);
    // finish function header
    code += `)${returnType === "int" ? " | 0" : ""};\n`;
    code += "\n";

    //
    // function return
    //
    if (extraReturn) {
      code += "  // There are pointers, so return the values of thoese too\n";
      code += "  const ret = [fn_ret, {\n";
      for (const { isPointer, name, type } of functionArgs) {
        if (!isPointer) continue;
        code += `    '${name}': cephes.${packageName}.getValue(carg_${name}, '${type2llvm[type]}'),\n`;
      }
      code += "  }] as const;\n";
    } else if (usesComplex) {
      for (const { name, type } of functionArgs) {
        if (!Boolean(type === "Complex")) continue;
        code += `  [${name}.real, ${name}.imag] = cephes.${packageName}.getValue(carg_${name}, 'Complex');\n`;
      }
    } else {
      code += "  // No pointers, so just return fn_ret\n";
      code += "  const ret = fn_ret;\n";
    }
    code += "\n";

    //
    // function footer
    //
    if (needStack) {
      code += "  // Restore internal stacktop before returning\n";
      code += `  cephes.${packageName}.stackRestore(stacktop);\n`;
    }
    if (returnType !== "void") {
      code += "  return ret;\n";
    } else if (usesComplex) {
      code += `  return ${functionArgs.findLast(({ fullType }) => fullType === "Complex").name};\n`;
    }

    code += "};\n";
    code += "\n";
    this.#functions.push(functionName);
    done(null, code);
  }
  _flush(callback) {
    this.push(
      "export default {compiled, createComplex, " +
        this.#functions.join(",") +
        "}",
    );
    callback();
  }
}

process.stdin
  .pipe(reader())
  .pipe(new InterfaceGenerator())
  .pipe(process.stdout);
