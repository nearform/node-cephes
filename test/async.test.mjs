import { it } from "node:test";
import { throws } from "node:assert";

import almostEqual from "./almost-equal.js";
import { AsyncCephesWrapper, CephesWrapper } from "../cephes-wrapper.cjs";

it("not waiting fails in async mode", function () {
  const cephes = new AsyncCephesWrapper();

  throws(() => cephes.cephes_exp(2), /cephes.cephes_exp is not a function/);
});

it("waiting works in async mode", async function () {
  const cephes = new AsyncCephesWrapper();
  await cephes.compiled;

  almostEqual(cephes.cephes_exp(2), Math.exp(2));
});

it("waiting is optional when in sync mode", async function () {
  const cephes = new CephesWrapper();

  almostEqual(cephes.cephes_exp(2), Math.exp(2));
});

it("index.mjs is cephes in async mode", async function () {
  const cephes = (await import("../index.mjs")).default;
  throws(() => cephes.exp(2), /cephes.cephes_exp is not a function/);

  await cephes.compiled;
  almostEqual(cephes.exp(2), Math.exp(2));
});
