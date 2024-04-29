const {it} = require('node:test');
const assert = require('node:assert');

const cephes = require('../index.js');
const almostEqual = require("./almost-equal.js");
const {errorMappings} = require('../utils');

const testsList = require('./expected.json').tests;

function getArgs(args) {
  return args.map(arg => Array.isArray(arg) ? new Float64Array(arg) : arg);
}

for (const { fn, ret, args, extra = {}, error_code } of testsList) {
  it(`random samples from ${fn}`, function (t) {
    const parsedArgs = getArgs(args);

    if (error_code !== -1) {
      const codemsg = errorMappings[error_code];
      const message = new RegExp(`cephes reports "${codemsg}" in`);

      assert.throws(() => cephes[fn].apply(null, parsedArgs), message);
      return;
    }

    const hasExtra = Object.keys(extra).length > 0;

    if (hasExtra) {
      const [actualRet, actualExtra] = cephes[fn].apply(null, parsedArgs);
      almostEqual(actualRet, ret);
      for (const extraKey of Object.keys(extra)) {
        almostEqual(actualExtra[extraKey], extra[extraKey]);
      }
    } else {
      const actualRet = cephes[fn].apply(null, parsedArgs);
      almostEqual(actualRet, ret);
    }
  });
}
