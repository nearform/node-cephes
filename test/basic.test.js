
const test = require('tap').test;
const cephes = require('../index.js');
const almostEqual = require("./almost-equal.js");

test('plain function', function (t) {
  almostEqual(t, cephes.exp2(3.4), Math.pow(2, 3.4));
  t.end();
});

test('extra function', function (t) {
  const [ret, {ai, aip, bi, bip}] = cephes.airy(1.2);
  almostEqual(t, ret, 0);

  // http://www.wolframalpha.com/input/?i=Ai(1.2),Ai%27(1.2),Bi(1.2),Bi%27(1.2)
  almostEqual(t, ai, 0.106126);
  almostEqual(t, aip, -0.132785);
  almostEqual(t, bi, 1.42113);
  almostEqual(t, bip, 1.22123);
  t.end();
});

test('array function', function (t) {
  almostEqual(t,
    cephes.polevl(1.1, new Float64Array([2.2, 3.3, 4.4].reverse()), 2),
    2.2 + 3.3 * 1.1 + 4.4 * 1.1 * 1.1
  );
  t.end();
});

test('throw error', function (t) {
  t.throws(() => cephes.zeta(0, 1), new RangeError('cephes reports "argument domain error" in zeta'));
  t.throws(() => cephes.zeta(1.2, -1), new Error('cephes reports "function singularity" in zeta'));
  t.end();
});

test('isfinite handling', function (t) {
  t.equal(cephes.isfinite(NaN), 0);
  t.equal(cephes.isfinite(Infinity), 0);
  t.equal(cephes.isfinite(-Infinity), 0);
  t.equal(cephes.isfinite(-1), 1);
  t.equal(cephes.isfinite(1), 1);
  t.equal(cephes.isfinite(0), 1);
  t.end();
});

test('isnan handling', function (t) {
  t.equal(cephes.isnan(NaN), 1);
  t.equal(cephes.isnan(Infinity), 0);
  t.equal(cephes.isnan(-Infinity), 0);
  t.equal(cephes.isnan(-1), 0);
  t.equal(cephes.isnan(1), 0);
  t.equal(cephes.isnan(0), 0);
  t.end();
});

test('nan returned', function (t) {
  t.ok(Number.isNaN(cephes.gamma(-Infinity)));
  t.end();
})

test('infinity returned', function (t) {
  const MAXL10 = 308.2547155599167;
  t.equal(cephes.exp10(MAXL10 + 1), Infinity);
  t.end();
})


test("compiled is a promise", async function (t) {
  await cephes.compiled;
  almostEqual(t, cephes.exp(2), Math.exp(2));
  t.end();
});
