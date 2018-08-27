
const stream = require('stream');
const reader = require('./reader.js');

const header = `
## Documentation

`;

class JSDocCGenerator extends stream.Transform {
  constructor() {
    super({ objectMode: true });
    this.push(header);

    this._previuseCategory = '';
  }

  _transform(data, encoding, done) {
    const {
      category, description,
      returnType, functionName, functionArgs
    } = data;

    // Check if there is extra data returned
    const extraReturn = functionArgs.some((arg) => arg.isPointer);

    //
    // Start code generation
    //
    let code = '';

    //
    // Add category header
    //
    if (this._previuseCategory !== category) {
      this._previuseCategory = category;
      code += `### ${category}\n`;
      code += '\n';
    }

    //
    // function header
    //

    // function name
    if (extraReturn) {
      code += `#### [${returnType}, extra] = cephes.${functionName}(`;
    } else {
      code += `#### ${returnType} = cephes.${functionName}(`;
    }
    // function arguments
    for (const {type, isPointer, isArray, fullType, name} of functionArgs) {
      if (isPointer) continue;

      if (isArray && type === 'double') {
        code += `${name}: Float64Array, `;
      } else if (!isArray) {
        code += `${name}: ${type}, `;
      } else {
        throw new Error(`unsupported type: ${fullType}`);
      }
    }
    // Remove training comma
    code = code.slice(0, -2);
    // finish function header
    code += ')\n';
    code += '\n';

    //
    // Documentation content
    //

    // Description
    code += `\`${functionName}\` is the "${description}". `;
    code += `You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#${functionName}.`;
    code += '\n';
    code += '\n';

    // Example
    code += '```js\n';
    if (extraReturn) {
      code += 'const [ret, extra] = ';
    } else {
      code += 'const ret = ';
    }
    code += `cephes.${functionName}(`;
    // function arguments
    for (const {type, isPointer, isArray, fullType, name} of functionArgs) {
      if (isPointer) continue;

      if (isArray && type === 'double') {
        code += `new Float64Array(${name}), `;
      } else if (!isArray) {
        code += `${name}, `;
      } else {
        throw new Error(`unsupported type: ${fullType}`);
      }
    }
    code = code.slice(0, -2);
    code += ');\n';
    code += '```\n';
    code += '\n';

    // extra return
    if (extraReturn) {
      code += 'The `extra` object contains the following values: \n';
      code += '\n';
      code += '```js\n';
      code += 'const {\n';
      for (const { isPointer, name, type } of functionArgs) {
        if (!isPointer) continue;
        code += `  ${name}: ${type},\n`;
      }
      code = code.slice(0, -2) + '\n';
      code += '} = extra;\n';
      code += '```\n';
      code += '\n';
    }

    done(null, code);
  }
}

process.stdin
  .pipe(reader())
  .pipe(new JSDocCGenerator())
  .pipe(process.stdout)
