
const test = require('tap').test;
const almostEqual = require("./almost-equal.js");
const CephesWrapper = require('../cephes-wrapper.js');

test("not waiting fails in async mode", function (t) {
  const cephes = new CephesWrapper(false); // async mode

  t.throws(() => cephes._cephes_exp(2), 'cephes._cephes_exp is not a function');
  t.end();
});

test("waiting works in async mode", async function (t) {
  const cephes = new CephesWrapper(false); // async mode
  await cephes.compiled;

  almostEqual(t, cephes._cephes_exp(2), Math.exp(2));
  t.end();
});

test("waiting is optional when in sync mode", async function (t) {
  const cephes = new CephesWrapper(true); // sync mode
  await cephes.compiled;

  almostEqual(t, cephes._cephes_exp(2), Math.exp(2));
  t.end();
});

test("cephes-browser.js is cephes in async mode", async function (t) {
  const cephes = require('../cephes-browser.js');
  t.throws(() => cephes._cephes_exp(2), 'cephes._cephes_exp is not a function');

  await cephes.compiled;
  almostEqual(t, cephes._cephes_exp(2), Math.exp(2));
  t.end();
});
