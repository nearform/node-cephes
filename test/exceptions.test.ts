import { it, test, mock } from "node:test";
import assert from "node:assert/strict";

test("exception handling", () => {
  it("restores stack when error is thrown", async () => {
    const mockStackRestore = mock.fn();
    const mockedInstance = await import("../src/cephes.ts").then((module) => {
      return {
        default: {
          ...module.default,
          ellf: {
            ...module.default.ellf,
            stackRestore: (ptr) => {
              mockStackRestore();
              return module.default.ellf.stackRestore(ptr);
            },
          },
        },
      };
    });

    mock.module("../src/cephes.ts", {
      defaultExport: mockedInstance.default,
      namedExports: mockedInstance.default,
    });
    const cephes = (await import("../src/index.ts")).default;

    assert.throws(() => {
      cephes.ellpj(Number.NaN, Number.POSITIVE_INFINITY);
    });
    assert.strictEqual(mockStackRestore.mock.calls.length, 1);
  });
});
