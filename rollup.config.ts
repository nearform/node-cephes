import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-node-polyfills";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import inject from "@rollup/plugin-inject";

export default {
  input: "index.js",
  output: {
    file: "index.mjs",
    format: "es",
  },
  plugins: [
    commonjs(),
    nodePolyfills(),
    alias({
      entries: [
        {
          find: "./cephes.cjs",
          replacement: "./cephes-browser.cjs",
        },
      ],
    }),
    inject({
      Buffer: ["buffer", "Buffer"],
    }),
    resolve({
      preferBuiltins: false
    }),
    json(),
  ],
}
