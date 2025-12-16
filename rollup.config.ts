import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-node-polyfills";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import inject from "@rollup/plugin-inject";

import fs from "fs";

function copyFilePlugin(options: { src: string; dest: string }) {
  const { src, dest } = options;
  return {
    name: "copy-file-plugin",
    writeBundle() {
      fs.copyFileSync(src, dest);
    },
  };
}
export default [
  {
    input: "./dist/index.js",
    output: {
      file: "index.js",
      format: "commonjs",
      exports: "named",
    },
    plugins: [
      commonjs(),
      nodePolyfills(),
      resolve({
        preferBuiltins: true,
      }),
      json(),
      copyFilePlugin({ src: "./dist/index.d.ts", dest: "./index.d.ts" }),
    ],
  },
  {
    input: "./dist/index.js",
    output: {
      file: "index.mjs",
      format: "es",
      exports: "named",
    },
    plugins: [
      commonjs(),
      nodePolyfills(),
      alias({
        entries: [
          {
            find: "./cephes.js",
            replacement: "./cephes-browser.js",
          },
        ],
      }),
      inject({
        Buffer: ["buffer", "Buffer"],
      }),
      resolve({
        preferBuiltins: false,
      }),
      json(),
    ],
  },
];
