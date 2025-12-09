import BaseCephesWrapper from "./base-cephes-wrapper.cjs";

const readJsonFile = async (jsonFilePath) => {
  const url = new URL(jsonFilePath, import.meta.url);

  if (url.protocol === "file:") {
    const { readFile } = await import("fs/promises");
    const text = await readFile(url, "utf8");
    return JSON.parse(text);
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
};
export default class AsyncCephesWrapper extends BaseCephesWrapper {
  _wasmCode = {};
  _wasmMethods = {};
  _errorMappings;
  constructor() {
    super();
    // create a singleton compile promise
    this.compiled = this._compileAsync().then((program) =>
      this._exportPrograms(program)
    );
  }

  _compileAsync() {
    return Promise.all([
      readJsonFile("./cephes.wasm.base64.json"),
      readJsonFile("./errors.json"),
    ]).then(([wasmJson, errorMappings]) => {
      for (const [pkg, { buffer, methods }] of Object.entries(wasmJson)) {
        this._wasmCode[pkg] = Uint8Array.from(atob(buffer), (c) =>
          c.charCodeAt(0)
        );
        this._wasmMethods[pkg] = methods.filter((el) => el.length);
      }

      this._errorMappings = errorMappings;
      const entries = Object.entries(this._wasmCode).map(([pkg, code]) =>
        WebAssembly.instantiate(code, this.getWasmImports()).then((result) => [
          pkg,
          result.instance,
        ])
      );

      return Promise.all(entries).then((resolvedEntries) =>
        Object.fromEntries(resolvedEntries)
      );
    });
  }
}
