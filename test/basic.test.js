const {it} = require('node:test');
const assert = require('node:assert');

const cephes = require('../index.js');
const almostEqual = require("./almost-equal.js");

it('plain function', function (t) {
  almostEqual(cephes.exp2(3.4), Math.pow(2, 3.4));
});

it('extra function', function (t) {
  const [ret, {ai, aip, bi, bip}] = cephes.airy(1.2);
  almostEqual(ret, 0);

  // http://www.wolframalpha.com/input/?i=Ai(1.2),Ai%27(1.2),Bi(1.2),Bi%27(1.2)
  almostEqual(ai, 0.106126);
  almostEqual(aip, -0.132785);
  almostEqual(bi, 1.42113);
  almostEqual(bip, 1.22123);
});

it('array function', function (t) {
  almostEqual(
    cephes.polevl(1.1, new Float64Array([2.2, 3.3, 4.4].reverse()), 2),
    2.2 + 3.3 * 1.1 + 4.4 * 1.1 * 1.1
  );
});

it('throw error', function (t) {
  assert.throws(() => cephes.zeta(0, 1), new RangeError('cephes reports "argument domain error" in zeta'));
  assert.throws(() => cephes.zeta(1.2, -1), new Error('cephes reports "function singularity" in zeta'));
});

it('isfinite handling', function (t) {
  assert.equal(cephes.isfinite(NaN), 0);
  assert.equal(cephes.isfinite(Infinity), 0);
  assert.equal(cephes.isfinite(-Infinity), 0);
  assert.equal(cephes.isfinite(-1), 1);
  assert.equal(cephes.isfinite(1), 1);
  assert.equal(cephes.isfinite(0), 1);
});

it('isnan handling', function (t) {
  assert.equal(cephes.isnan(NaN), 1);
  assert.equal(cephes.isnan(Infinity), 0);
  assert.equal(cephes.isnan(-Infinity), 0);
  assert.equal(cephes.isnan(-1), 0);
  assert.equal(cephes.isnan(1), 0);
  assert.equal(cephes.isnan(0), 0);
});

it('nan returned', function (t) {
  assert.equal(Number.isNaN(cephes.gamma(-Infinity)), true);
})

it('infinity returned', function (t) {
  const MAXL10 = 308.2547155599167;
  assert.equal(cephes.exp10(MAXL10 + 1), Infinity);
})


it("compiled is a promise", async function (t) {
  await cephes.compiled;
  almostEqual(cephes.exp(2), Math.exp(2));
});
