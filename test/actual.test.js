
const fs = require('fs');
const path = require('path');
const test = require('tap').test;
const cephes = require('../index.js');
const almostEqual = require("./almost-equal.js");

const expectedList = fs.readFileSync(
    path.resolve(__dirname, 'expected.ndjson')
  )
  .toString()
  .split('\n')
  .slice(0, -1)
  .map((line) => JSON.parse(line));

const mtherr_codemsg = new Map([
  [0, 'unknown error'],
  [1, 'argument domain error'],
  [2, 'function singularity'],
  [3, 'overflow range error'],
  [4, 'underflow range error'],
  [5, 'total loss of precision'],
  [6, 'partial loss of precision'],
  [33, 'Unix domain error code'],
  [34, 'Unix range error code']
]);

for (const { fn, ret, args, extra, error_code } of expectedList) {
  const hasExtra = Object.keys(extra).length > 0;
  const parsedArgs = args.map(function (arg) {
    if (Array.isArray(arg)) return new Float64Array(arg);
    else return arg;
  });

  test(`random samples from ${fn}`, function (t) {
    if (error_code !== -1) {
      const codemsg = mtherr_codemsg.get(error_code);
      const message = new RegExp('^cephes reports "' + codemsg + '" in [a-z0-9]+$');
      t.throws(() => cephes[fn].apply(null, parsedArgs), message);
      t.end();
      return;
    }

    if (hasExtra) {
      let [actualRet, actualExtra] = cephes[fn].apply(null, parsedArgs);
      almostEqual(t, actualRet, ret);
      for (const extraKey of Object.keys(extra)) {
        almostEqual(t, actualExtra[extraKey], extra[extraKey]);
      }
    } else {
      let actualRet = cephes[fn].apply(null, parsedArgs);
      almostEqual(t, actualRet, ret);
    }

    t.end();
  });
}
