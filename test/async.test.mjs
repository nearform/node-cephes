import { before, it } from "node:test";
import { throws } from "node:assert";

import almostEqual from "./almost-equal.js";
import AsyncCephesWrapper from "../cephes-wrapper.mjs";
let CephesWrapperSync;
before(async () => {
  CephesWrapperSync = (await import("../cephes-wrapper.cjs")).default;
});

it("not waiting fails in async mode", function () {
  const cephes = new AsyncCephesWrapper(); // async mode

  throws(() => cephes.cephes_exp(2), /cephes.cephes_exp is not a function/);
});

it("waiting works in async mode", async function () {
  const cephes = new AsyncCephesWrapper(); // async mode
  await cephes.compiled;

  almostEqual(cephes.cephes_exp(2), Math.exp(2));
});

it("waiting is optional when in sync mode", async function () {
  const cephes = new CephesWrapperSync(); // sync mode
  await cephes.compiled;

  almostEqual(cephes.cephes_exp(2), Math.exp(2));
});

it("cephes.mjs is cephes in async mode", async function () {
  const cephes = (await import(`../cephes.mjs`)).default;
  throws(() => cephes.cephes_exp(2), /cephes.cephes_exp is not a function/);

  await cephes.compiled;
  almostEqual(cephes.cephes_exp(2), Math.exp(2));
});
