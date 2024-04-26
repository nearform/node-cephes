const {it} = require('node:test');
const assert = require('node:assert');

const almostEqual = require("./almost-equal.js");
const CephesWrapper = require('../cephes-wrapper.js');

it("not waiting fails in async mode", function (t) {
  const cephes = new CephesWrapper(false); // async mode

  assert.throws(() => cephes.cephes_exp(2), /cephes.cephes_exp is not a function/);
});

it("waiting works in async mode", async function (t) {
  const cephes = new CephesWrapper(false); // async mode
  await cephes.compiled;

  almostEqual(cephes.cephes_exp(2), Math.exp(2));
});

it("waiting is optional when in sync mode", async function (t) {
  const cephes = new CephesWrapper(true); // sync mode
  await cephes.compiled;

  almostEqual(cephes.cephes_exp(2), Math.exp(2));
});

it("cephes-browser.js is cephes in async mode", async function (t) {
  const cephes = require('../cephes-browser.js');
  assert.throws(() => cephes.cephes_exp(2), /cephes.cephes_exp is not a function/);

  await cephes.compiled;
  almostEqual(cephes.cephes_exp(2), Math.exp(2));
});
