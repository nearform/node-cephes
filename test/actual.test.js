const { it, describe } = require("node:test");
const assert = require("node:assert");

const cephes = require("../index.js");
const almostEqual = require("./almost-equal.js");
const errorMappings = require("../errors.json");

const testCases = require("./expected.json");

const cephesTestCase = (testCase) => {
  const { fn, ret, args, extra = {}, error_code, complex } = testCase;
  const parsedArgs = args.map((arg) =>
    Array.isArray(arg)
      ? new Float64Array(arg)
      : arg === "Infinity"
        ? Number.POSITIVE_INFINITY
        : arg === "NaN"
          ? Number.NaN
          : arg,
  );

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
  } else if (complex) {
    cephes[fn].apply(null, parsedArgs);
    complex.forEach((item, index) => {
      almostEqual(item.real, parsedArgs[index].real);
      almostEqual(item.imag, parsedArgs[index].imag);
    });
  } else {
    const actualRet = cephes[fn].apply(null, parsedArgs);
    almostEqual(actualRet, ret);
  }
};

for (const [pkg, testsList] of Object.entries(testCases)) {
  describe(`random tests from ${pkg}`, () => {
    for (const testCase of testsList) {
      it(`random samples from ${testCase.fn}`, () => cephesTestCase(testCase));
    }
  });
}
