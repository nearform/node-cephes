
const XorShift = require('xorshift').constructor;
const stream = require('stream');
const reader = require('./reader.js');

const header = `
#include "mconf.h"
#include "cephes.h"
#include <stdio.h>

int error_code = -1;
int mtherr(char *name, int code) {
  error_code = code;
  return 0;
}

int main() {
`;

const footer = `}\n`;

var rng = new XorShift([
  6724524440630955, 4369800304473057,
  1956920014856890, 8721370862793116
]);

const type2printf = {
  'double': '%.20f',
  'int': '%d'
};

const type2zero = {
  'double': '0.0',
  'int': '0'
};

const argGenerators = {
  double: function () {
    return (rng.random() * 10).toFixed(8);
  },

  int: function () {
    return (rng.random() * 10 + 1).toFixed(0);
  },

  "double[]": function () {
    let code = '[';
    code += (rng.random() * 20 - 10).toFixed(2) + ', ';
    code += (rng.random() * 20 - 10).toFixed(2) + ', ';
    code += (rng.random() * 20 - 10).toFixed(2) + ', ';
    code += (rng.random() * 20 - 10).toFixed(2) + ']';
    return code;
  },

  // Bad range in igami, causes infinite loop
  "igami:y0": function () {
    return rng.random().toFixed(8);
  },
  "igami:a": function () {
    return (rng.random() * 10).toFixed(8);
  }
};

class CTesterGenerator extends stream.Transform {
  constructor() {
    super({ objectMode: true });
    this.push(header);
  }

  _generateSampleCode(data) {
    const {filename, returnType, functionName, functionArgs} = data;

    // Check if there is extra data returned
    const extraReturn = functionArgs.some((arg) => arg.isPointer);

    // Sample function arguments
    let fnargs = new Map();
    for (const { fullType, name, isPointer, isArrayLength } of functionArgs) {
      if (isPointer) continue;
      if (isArrayLength) {
         // The array is of length 4, .length - 1 is not always the correct
         // choice, but it is always the safe choice.
        fnargs.set(name, "3");
      } else if (argGenerators.hasOwnProperty(`${functionName}:${name}`)) {
        fnargs.set(name, argGenerators[`${functionName}:${name}`]());
      } else {
        fnargs.set(name, argGenerators[fullType]());
      }
    }

    //
    // Start code generation
    //
    let code = '';
    code += `  { /* ${functionName} from cephes/${filename}.c */\n`;
    code += '     error_code = -1;\n';
    //
    // Function call
    //

    // Create pointer inputs
    for (const { type, name, isPointer } of functionArgs) {
      if (!isPointer) continue;
      code += `    ${type} extra_${name} = ${type2zero[type]};\n`;
    }

    // Call function
    code += `    ${returnType} ret = cephes_${functionName}(`
    for (const { fullType, name, isPointer, isArray } of functionArgs) {
      if (isPointer) {
        code += `&extra_${name}, `;
      } else if (isArray) {
        const c_array = fnargs.get(name).replace('[', '{').replace(']', '}');
        code += `(${fullType}) ${c_array}, `;
      }
      else code += fnargs.get(name) + ', ';
    }
    code = code.slice(0, -2);
    code += ');\n';

    // Normalize return value
    code += `    ret = error_code == -1 ? ret : ${type2zero[returnType]};\n`;

    //
    // Print output
    //

    // The printf string
    code += `    printf("{"\n`;
    code += `           "\\"fn\\": \\"${functionName}\\", "\n`;
    code += `           "\\"ret\\": ${type2printf[returnType]}, "\n`;
    code += `           "\\"args\\": [`;
    for (const { name, isPointer } of functionArgs) {
      if (isPointer) continue;
      code += `${fnargs.get(name)}, `;
    }
    code = code.slice(0, -2);
    code += `], "\n`;
    code += `           "\\"extra\\": {`;
    if (extraReturn) {
      for (const { type, name, isPointer } of functionArgs) {
        if (!isPointer) continue;
        code += `\\"${name}\\": ${type2printf[type]}, `;
      }
      code = code.slice(0, -2);
    }
    code += `}, "\n`;
    code += `           "\\"error_code\\": %d"\n`;
    code += `           "}\\n",\n`;

    // The printf content
    code += `           ret, `;
    for (const { fullType, name, isPointer } of functionArgs) {
      if (!isPointer) continue;
      code += `extra_${name}, `;
    }
    code += `error_code`;

    // Close printf
    code += `);\n`;

    //
    code += '  }\n';
    code += '\n';

    return code;
  }

  _transform(data, encoding, done) {
    for (let i = 0; i < 5; i++) {
      this.push(this._generateSampleCode(data));
    }
    done(null);
  }

  _flush(done) {
    this.push(footer);
    done(null);
  }
}

process.stdin
  .pipe(reader())
  .pipe(new CTesterGenerator())
  .pipe(process.stdout)
