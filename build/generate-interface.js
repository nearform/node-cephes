
const stream = require('stream');
const reader = require('./reader.js');

const type2llvm = {
  'double': 'double',
  'int': 'i32'
}

const argGenerators = {
  double: function (name, needStack) {
    let code = '';
    code += `  // argument: double ${name}\n`;
    code += `  if (typeof ${name} !== 'number') {\n`;
    if (needStack) code += '    cephes.stackRestore(stacktop);\n';
    code += `    throw new TypeError('${name} must be a number');\n`;
    code += `  }\n`;
    code += `  const carg_${name} = ${name};\n`;
    return code;
  },

  int: function (name, needStack) {
    let code = '';
    code += `  // argument: int ${name}\n`;
    code += `  if (typeof ${name} !== 'number') {\n`;
    if (needStack) code += '    cephes.stackRestore(stacktop);\n';
    code += `    throw new TypeError('${name} must be a number');\n`;
    code += `  }\n`;
    code += `  const carg_${name} = ${name} | 0;\n`;
    return code;
  },

  "double*": function (name, needStack) {
    let code = '';
    code += `  // argument: double* ${name}\n`;
    code += `  const carg_${name} = cephes.stackAlloc(8); // No need to zero-set it.\n`;
    return code;
  },

  "int*": function (name, needStack) {
    let code = '';
    code += `  // argument: int* ${name}\n`;
    code += `  const carg_${name} = cephes.stackAlloc(4); // No need to zero-set it.\n`;
    return code;
  },

  "double[]": function (name, needStack) {
    let code = '';
    code += `  // argument: double[] ${name}\n`;
    code += `  if (!(${name} instanceof Float64Array)) {\n`;
    if (needStack) code += '    cephes.stackRestore(stacktop);\n';
    code += `    throw new TypeError('${name} must be either a Float64Array');\n`;
    code += `  }\n`;
    code += `  const carg_${name} = cephes.stackAlloc(${name}.length << 3);\n`;
    code += `  cephes.writeArrayToMemory(new Uint8Array(${name}.buffer, ${name}.byteOffset, ${name}.byteLength), carg_${name});\n`;
    return code;
  }
};

const header = `
const cephes = require('./cephes.js');

// Export compiled promise, in Node.js this is just a dummy promise as the
// WebAssembly program will be compiled synchronously. It takes about 20ms
// as of Node.js v10.6.1.
exports.compiled = cephes.compiled;

`;

class InterfaceGenerator extends stream.Transform {
  constructor() {
    super({ objectMode: true });
    this.push(header);
  }

  _transform(data, encoding, done) {
    const {filename, returnType, functionName, functionArgs} = data;

    // Check if the stack will be needed because of isPointer or isArray
    const needStack = functionArgs.some((arg) => arg.isArray || arg.isPointer);

    // Check if there is extra data returned
    const extraReturn = functionArgs.some((arg) => arg.isPointer);

    //
    // Start code generation
    //
    let code = '';

    //
    // function header
    //

    // function name
    code += `// from cephes/${filename}.c\n`;
    code += `exports.${functionName} = function ${functionName}(`
    // function arguments
    for (const {type, isPointer, isArray, name} of functionArgs) {
      if (isPointer) continue;
      code += `/* ${type}${isArray ? '[]' : ''} */ ${name}, `;
    }
    // Remove training comma
    code = code.slice(0, -2);
    // finish function header
    code += `) {\n`;

    if (needStack) {
      code += '  //Save the STACKTOP because the following code will do some stack allocs\n';
      code += `  const stacktop = cephes.stackSave();\n`;
      code += '\n';
    }

    //
    // function arguments
    //
    for (const {fullType, name} of functionArgs) {
      code += argGenerators[fullType](name, needStack);
      code += '\n';
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
    code += `)${returnType === 'int' ? ' | 0' : ''};\n`;
    code += '\n';

    //
    // function return
    //
    if (extraReturn) {
      code += '  // There are pointers, so return the values of thoese too\n';
      code += '  const ret = [fn_ret, {\n';
      for (const { isPointer, name, type } of functionArgs) {
        if (!isPointer) continue;
        code += `    '${name}': cephes.getValue(carg_${name}, '${type2llvm[type]}'),\n`;
      }
      code += '  }];\n';
    } else {
      code += '  // No pointers, so just return fn_ret\n';
      code += '  const ret = fn_ret;\n';
    }
    code += '\n';

    //
    // function footer
    //
    if (needStack) {
      code += '  // Restore internal stacktop before returning\n';
      code += '  cephes.stackRestore(stacktop);\n';
    }
    code += '  return ret;\n';
    code += '};\n';
    code += '\n';

    done(null, code);
  }
}

process.stdin
  .pipe(reader())
  .pipe(new InterfaceGenerator())
  .pipe(process.stdout)
