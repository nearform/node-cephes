import { it } from "node:test";

import almostEqual from "./almost-equal.js";
import cephes from "../index.mjs";

it("cephes laods as esm module", async function () {
  await cephes.compiled;
  almostEqual(cephes.exp(2), Math.exp(2));
});
