import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-node-polyfills";
import json from "@rollup/plugin-json";

export default {
    input: "main.js",
    output: {
        file: "bundle.mjs",
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
}
