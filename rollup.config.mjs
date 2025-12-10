import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-node-polyfills";
import json from "@rollup/plugin-json";

/**
 * Create Rollup config for exporting ESM in the current directory
 *
 * @param {string} input Input file
 * @param {string} output Output file
 * @returns {import("rollup").RollupOptions}
 */
export const createConfig = (input, output) => {
  return {
    input,
    output: {
      file: output,
      format: "es",
    },
    plugins: [
      nodePolyfills(),
      resolve({
        preferBuiltins: false,
        browser: true,
      }),
      commonjs(),
      json(),
    ],
  };
};

export default createConfig("index.js", "index.mjs");
