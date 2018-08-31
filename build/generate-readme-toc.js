
const stream = require('stream');
const reader = require('./reader.js');

const header = `
## Table of Content

<table>
<thead>
  <th>Function</th>
  <th>Description</th>
  <th>Documentation</th>
</thead>
<tbody>
`;

const footer = `
</tbody>
</table>
`

function JSDocHeaderId({extraReturn, returnType, functionName, functionArgs}) {
  code = '';

  // function name
  if (extraReturn) {
    code += `[${returnType}, extra] = cephes.${functionName}(`;
  } else {
    code += `${returnType} = cephes.${functionName}(`;
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
  code += ')';

  return code.replace(/[ ]/g, '-').replace(/[=,.():\[\]]/g, '').toLowerCase();
}

class TocGenerator extends stream.Transform {
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
      code += '  <tr>\n';
      code += `    <td colspan="3"><strong>${category}</strong></td>\n`;
      code += '  </tr>\n';
    }

    //
    // function
    //
    code += '  <tr>\n';

    // function name
    code += '    <td><code>';
    code += `${functionName}(`;
    // function arguments
    for (const {isPointer, name} of functionArgs) {
      if (isPointer) continue;
      code += `${name}, `;
    }
    // Remove training comma
    code = code.slice(0, -2);
    // finish function
    code += ')';
    code += '</code></td>\n';

    //
    // Description
    //
    code += `    <td>${description}</td>\n`;

    //
    // Documentation
    //
    code += '    <td>';
    code += `<a href="http://www.netlib.org/cephes/doubldoc.html#${functionName}">c-doc</a>`;
    code += '&nbsp;&nbsp;&#8226;&nbsp;&nbsp;';
    code += `<a href="#${JSDocHeaderId({extraReturn, returnType, functionName, functionArgs})}">js-doc</a>`;
    code += '</td>\n';

    code += '</tr>\n';

    this.push(code);
    done(null);
  }

  _flush(done) {
    this.push(footer);
    done(null);
  }
}

process.stdin
  .pipe(reader())
  .pipe(new TocGenerator())
  .pipe(process.stdout)
