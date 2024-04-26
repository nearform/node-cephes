const {it} = require('node:test');
const assert = require('node:assert');

const cephes = require('../index.js');
const almostEqual = require("./almost-equal.js");
const {errorMappings} = require('../utils');

const expectedList = require('./expected.json').tests;

const testsWithExpectedErrors = expectedList.filter(test => test.error_code !== -1);
const testsWithNotExpectedErrors = expectedList.filter(test => test.error_code === -1);

function getArgs(args) {
  return args.map(arg => Array.isArray(arg) ? new Float64Array(arg) : arg);
}

for (const { fn, ret, args, extra = {} } of testsWithNotExpectedErrors) {
  const hasExtra = Object.keys(extra).length > 0;

  it(`random samples from ${fn}`, function (t) {
    const parsedArgs = getArgs(args);

    if (hasExtra) {
      let [actualRet, actualExtra] = cephes[fn].apply(null, parsedArgs);
      almostEqual(actualRet, ret);
      for (const extraKey of Object.keys(extra)) {
        almostEqual(actualExtra[extraKey], extra[extraKey]);
      }
    } else {
      let actualRet = cephes[fn].apply(null, parsedArgs);
      almostEqual(actualRet, ret);
    }
  });
}

for (const { fn, args, error_code } of testsWithExpectedErrors) {
  const parsedArgs = getArgs(args);

  it(`random samples from ${fn}`, function (t) {
    const codemsg = errorMappings[error_code];
    const message = new RegExp(`cephes reports "${codemsg}" in`);

    assert.throws(() => cephes[fn].apply(null, parsedArgs), message);
  });
}
