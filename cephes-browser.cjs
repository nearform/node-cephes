/**
 * Code used to compile ESM version of the code. Will replace ./cephes.cjs in bundling.
 */

if (typeof window !== "undefined") {
  const { Buffer } = require("buffer");

  window.Buffer = Buffer;
}

const { AsyncCephesWrapper } = require("./cephes-wrapper.cjs");

module.exports = new AsyncCephesWrapper();
