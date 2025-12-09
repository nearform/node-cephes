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
};

const headers = {
  cjs: `
const cephes = require('./cephes.cjs');

// Export compiled promise, in Node.js this is just a dummy promise as the
// WebAssembly program will be compiled synchronously. It takes about 20ms
// as of Node.js v10.6.1.
exports.compiled = cephes.compiled;

`,
  esm: `
import cephes from './cephes.mjs';

// Export compiled promise, in Node.js this is just a dummy promise as the
// WebAssembly program will be compiled synchronously. It takes about 20ms
// as of Node.js v10.6.1.
export const compiled = cephes.compiled;

`,
};

class InterfaceGenerator extends stream.Transform {
  constructor(format) {
    super({ objectMode: true });
    if (format !== "esm" && format !== "cjs") {
      throw `Format "${format} is invalid."`;
    }
    this.format = format;
    this.push(headers[this.format]);
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

    //
    // function header
    //

    // function name
    code += `// from cephes/${packageName}/${filename}.c\n`;
    if (this.format === "cjs") {
      code += `exports.${functionName} = function ${functionName}(`;
    } else {
      code += `export function ${functionName}(`;
    }

    // function arguments
    for (const { type, isPointer, isArray, name } of functionArgs) {
      if (isPointer) continue;
      code += `/* ${type}${isArray ? "[]" : ""} */ ${name}, `;
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
    code += `  const fn_ret = cephes.cephes_${functionName}(`;
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
      code += "  }];\n";
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
    code += "  return ret;\n";
    code += "};\n";
    code += "\n";

    done(null, code);
  }
}
/**
 *
 * @param {string[]} args
 * @returns {"cjs"|"esm"}
 */
const parseArgs = (args = process.argv.slice(2)) => {
  let format = "cjs";

  args.forEach((arg, index) => {
    switch (arg) {
      case "--format":
        const value = args[index + 1];
        if (value === "esm" || value === "cjs") {
          format = value;
        } else {
          throw `Invalid format "${value}". Must be either "esm" or "cjs".`;
        }
    }
  });
  return format;
};
process.stdin
  .pipe(reader())
  .pipe(new InterfaceGenerator(parseArgs()))
  .pipe(process.stdout);
