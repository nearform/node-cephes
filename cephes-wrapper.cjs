const BaseCephesWrapper = require("./base-cephes-wrapper.cjs");

class CephesWrapper extends BaseCephesWrapper {
  _wasmCode = {};
  _wasmMethods = {};
  _errorMappings;
  constructor() {
    super();
    // Compile and export program
    const program = this._compile();
    this._exportPrograms(program);

    // create a dummy compile promise
    this.compiled = Promise.resolve();
  }

  _compile() {
    for (const [pkg, { buffer, methods }] of Object.entries(
      require("./cephes.wasm.base64.json")
    )) {
      this._wasmCode[pkg] = Buffer.from(buffer, "base64");
      this._wasmMethods[pkg] = methods.filter((el) => el.length);
    }

    this._errorMappings = require("./errors.json");
    return Object.fromEntries(
      Object.entries(this._wasmCode).map(([pkg, code]) => [
        pkg,
        new WebAssembly.Instance(
          new WebAssembly.Module(code),
          this.getWasmImports(pkg)
        ),
      ])
    );
  }
}

module.exports = CephesWrapper;
