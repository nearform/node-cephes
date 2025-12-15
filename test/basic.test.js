const { it } = require("node:test");
const assert = require("node:assert");

const cephes = require("../index.js");
const asyncCephes = require("../dist/cephes-browser.js").default;
const almostEqual = require("./almost-equal.js");

it("plain function", function () {
  almostEqual(cephes.exp2(3.4), Math.pow(2, 3.4));
});

it("extra function", function () {
  const [ret, { ai, aip, bi, bip }] = cephes.airy(1.2);
  almostEqual(ret, 0);

  // http://www.wolframalpha.com/input/?i=Ai(1.2),Ai%27(1.2),Bi(1.2),Bi%27(1.2)
  almostEqual(ai, 0.106126);
  almostEqual(aip, -0.132785);
  almostEqual(bi, 1.42113);
  almostEqual(bip, 1.22123);
});

it("array function", function () {
  almostEqual(
    cephes.polevl(1.1, new Float64Array([2.2, 3.3, 4.4].reverse()), 2),
    2.2 + 3.3 * 1.1 + 4.4 * 1.1 * 1.1,
  );
});

it("throw error", function () {
  assert.throws(
    () => cephes.zeta(0, 1),
    new RangeError('cephes reports "argument domain error" in zeta'),
  );
  assert.throws(
    () => cephes.zeta(1.2, -1),
    new Error('cephes reports "function singularity" in zeta'),
  );
});

it("isfinite handling", function () {
  assert.equal(cephes.isfinite(NaN), 0);
  assert.equal(cephes.isfinite(Infinity), 0);
  assert.equal(cephes.isfinite(-Infinity), 0);
  assert.equal(cephes.isfinite(-1), 1);
  assert.equal(cephes.isfinite(1), 1);
  assert.equal(cephes.isfinite(0), 1);
});

it("isnan handling", function () {
  assert.equal(cephes.isnan(NaN), 1);
  assert.equal(cephes.isnan(Infinity), 0);
  assert.equal(cephes.isnan(-Infinity), 0);
  assert.equal(cephes.isnan(-1), 0);
  assert.equal(cephes.isnan(1), 0);
  assert.equal(cephes.isnan(0), 0);
});

it("nan returned", function () {
  assert.equal(Number.isNaN(cephes.gamma(-Infinity)), true);
});

it("infinity returned", function () {
  const MAXL10 = 308.2547155599167;
  assert.equal(cephes.exp10(MAXL10 + 1), Infinity);
});

it("compiled is a promise", async function () {
  await asyncCephes.compiled;
  almostEqual(asyncCephes.cephes_exp(2), Math.exp(2));
});

it("calculates ellie(1.0731208831306067, 0.9128794812874865) correctly", async function () {
  almostEqual(
    cephes.ellie(1.0731208831306067, 0.9128794812874865),
    0.8994413957643846,
  );
});
