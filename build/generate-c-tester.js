const { constructor: XorShift } = require("xorshift");
const stream = require("stream");
const reader = require("./reader.js");

//The default number of items in an array
const DEFAULT_ARRAY_LENGTH = 4;
//The number of times to run each method
const NUM_CALLS = 6;

const header = `
#include "mconf.h"
#include "${process.argv[2]}"
#include <stdio.h>
extern double INFINITY, NAN;
int error_code = -1;
int mtherr(char *name, int code) {
  error_code = code;
  return 0;
}

int main() {
`;

const footer = `}\n`;

var rng = new XorShift([
  6724524440630955, 4369800304473057, 1956920014856890, 8721370862793116,
]);

const type2printf = {
  double: "%.20f",
  int: "%d",
  void: "%s",
};

const type2zero = {
  double: "0.0",
  int: "0",
};

const _nInfiniteCounter = {};
const _nNaNCounter = {};
const doubleArrayGenerator = function (options) {
  let { n = DEFAULT_ARRAY_LENGTH } = options ?? {};
  let code = "[";
  for (let i = 1; i < n; ++i) {
    code += (rng.random() * 20 - 10).toFixed(2) + ", ";
  }
  code += (rng.random() * 20 - 10).toFixed(2) + "]";
  return code;
};
const doubleGenerator = function (options) {
  const { fname, nInfinite = 0, nNaN = 0 } = options ?? {};
  if (fname) {
    if (nInfinite) {
      if (_nInfiniteCounter[fname] === undefined) {
        _nInfiniteCounter[fname] = nInfinite;
      }
      const remaining = _nInfiniteCounter[fname];
      if (remaining) {
        --_nInfiniteCounter[fname];
        return Number.POSITIVE_INFINITY;
      }
    }
    if (nNaN) {
      if (_nNaNCounter[fname] === undefined) {
        _nNaNCounter[fname] = nNaN;
      }
      const remaining = _nNaNCounter[fname];
      if (remaining) {
        --_nNaNCounter[fname];
        return Number.NaN;
      }
    }
  }

  return (rng.random() * 10).toFixed(8);
};

const argGenerators = {
  double: function () {
    return (rng.random() * 10).toFixed(8);
  },

  int: function () {
    return (rng.random() * 10 + 1).toFixed(0);
  },

  "double[]": doubleArrayGenerator,
  Complex: function () {
    let code = "[";
    code += (rng.random() * 20 - 10).toFixed(2) + ", ";
    code += (rng.random() * 20 - 10).toFixed(2) + "]";
    return code;
  },
  // Bad range in igami, causes infinite loop
  "igami:y0": function () {
    return rng.random().toFixed(8);
  },
  "igami:a": function () {
    return (rng.random() * 10).toFixed(8);
  },
  // special case as NCOTE is 8 and so there should be at least one more value than that
  "simpsn:f": () => doubleArrayGenerator({ n: 9 }),
  // Allow NaN and Infinite testing
  "isnan:x": () => doubleGenerator({ fname: "isnan:x", nNaN: 1, nInfinite: 1 }),
  "isfinite:x": () =>
    doubleGenerator({ fname: "isfinite:x", nNaN: 1, nInf: 1 }),
};

class CTesterGenerator extends stream.Transform {
  constructor() {
    super({ objectMode: true });
    this.push(header);
  }

  _generateSampleCode(data) {
    const { filename, returnType, functionName, functionArgs } = data;

    // Check if there is extra data returned
    const extraReturn = functionArgs.some((arg) => arg.isPointer);

    // Sample function arguments
    const fnargs = new Map();
    for (const { fullType, name, isPointer, isArrayLength } of functionArgs) {
      if (isPointer) continue;
      if (isArrayLength) {
        // The array is of length 4, .length - 1 is not always the correct
        // choice, but it is always the safe choice.
        fnargs.set(name, String(DEFAULT_ARRAY_LENGTH - 1));
      } else if (argGenerators.hasOwnProperty(`${functionName}:${name}`)) {
        fnargs.set(name, argGenerators[`${functionName}:${name}`]());
      } else {
        fnargs.set(name, argGenerators[fullType]());
      }
    }

    //
    // Start code generation
    //
    let code = "";
    code += `  { /* ${functionName} from cephes/${filename}.c */\n`;
    code += "    error_code = -1;\n";
    //
    // Function call
    //

    // Create pointer inputs
    for (const { type, name, isPointer } of functionArgs) {
      if (isPointer) {
        code += `    ${type} extra_${name} = ${type2zero[type]};\n`;
      }
      if (type === "Complex") {
        const c_array = fnargs.get(name).replace("[", "{").replace("]", "}");
        code += `    cmplx ${name} = ${c_array};\n`;
      }
    }

    // Call function
    code += `    ${
      returnType === "void" ? "" : `${returnType} ret = `
    }${functionName}(`;
    for (const { fullType, name, isPointer, isArray } of functionArgs) {
      if (isPointer) {
        code += `&extra_${name}, `;
      } else if (isArray || fullType === "Complex") {
        const c_array = fnargs.get(name).replace("[", "{").replace("]", "}");
        if (fullType === "Complex") {
          code += `&${name}, `;
        } else {
          code += `(${fullType}) ${c_array}, `;
        }
      } else {
        const value = fnargs.get(name);
        if (Number.isNaN(value) || value === Number.POSITIVE_INFINITY) {
          code += Number.isNaN(value) ? "NAN, " : "INFINITY, ";
        } else {
          code += value + ", ";
        }
      }
    }
    code = code.slice(0, -2);
    code += ");\n";

    // Normalize return value
    if (returnType !== "void") {
      code += `    ret = error_code == -1 ? ret : ${type2zero[returnType]};\n`;
    }

    //
    // Print output
    //

    // The printf string
    code += `    printf("{"\n`;
    code += `           "\\"fn\\": \\"${functionName}\\", "\n`;
    code += `           "\\"ret\\": ${type2printf[returnType]}, "\n`;
    code += `           "\\"args\\": [`;
    for (const { name, isPointer, fullType } of functionArgs) {
      if (isPointer) continue;
      if (fullType === "Complex") {
        const cmplx = JSON.parse(fnargs.get(name));
        code += `{\\"real\\": ${cmplx[0]}, \\"imag\\":${cmplx[1]}}, `;
      } else {
        code += `${fnargs.get(name)}, `;
      }
    }
    code = code.slice(0, -2);
    code += `], "\n`;
    if (functionArgs.some((arg) => arg.fullType === "Complex")) {
      code += `           "\\"complex\\": [`;
      for (const { fullType } of functionArgs) {
        if (fullType !== "Complex") continue;
        code += `{\\"real\\": ${type2printf["double"]}, \\"imag\\": ${type2printf["double"]}}, `;
      }
      code = code.slice(0, -2);
      code += `], "\n`;
    }

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
    code += `           ${returnType === "void" ? '"null"' : "ret"}, `;
    for (const { name, isPointer, type } of functionArgs) {
      if (isPointer) {
        code += `extra_${name}, `;
      } else if (type === "Complex") {
        code += `${name}.r, ${name}.i, `;
      }
    }
    code += `error_code`;

    // Close printf
    code += `);\n`;

    //
    code += "  }\n";
    code += "\n";

    return code;
  }

  _transform(data, encoding, done) {
    for (let i = 0; i < NUM_CALLS; i++) {
      this.push(this._generateSampleCode(data));
    }
    done(null);
  }

  _flush(done) {
    this.push(footer);
    done(null);
  }
}

process.stdin.pipe(reader()).pipe(new CTesterGenerator()).pipe(process.stdout);
