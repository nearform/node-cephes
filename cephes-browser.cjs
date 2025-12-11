/**
 * Code used to compile ESM version of the code. Will replace ./cephes.cjs in bundling.
 */

const { AsyncCephesWrapper } = require("./cephes-wrapper.cjs");

module.exports = new AsyncCephesWrapper();
