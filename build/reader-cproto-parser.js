const stream = require("stream");
const split2 = require("split2");
const pumpify = require("pumpify");

const SPLIT_COMMENT = /^\/\*\s+cephes\/([^\/]+)\/([a-z0-9]+)\.c\s+\*\/$/;
const SPLIT_PROTO =
  /^(double|int|void)\s+([a-z0-9]+)\(([A-Za-z0-9_ ,*\[\]]+)\);$/;
const SPLIT_ARG = /^(double|int|Complex)\s+(\*)?([A-Za-z0-9]+)(\[\])?$/;
const COMPLEX_ARG = /((?:register\s+)?(?:cmplx\s+)\*\s*)([A-Za-z0-9]+)/g;
class CprotoLineParser extends stream.Transform {
  constructor() {
    super({ objectMode: true });
    this._currentFilename = "";
    this._currentPackage = "";
  }

  _parseFilename(comment) {
    const [, pkg, filename] = comment.match(SPLIT_COMMENT);
    this._currentFilename = filename;
    this._currentPackage = pkg;
  }

  _parseProto(proto) {
    const [, returnType, functionName, functionArgsStr] =
      proto.match(SPLIT_PROTO);
    const rawFunctionArgs = functionArgsStr.split(/, ?/);
    let prevIsArray = false;
    const functionArgs = rawFunctionArgs.map(function (arg, i) {
      const [, mainType, pointer, name, array] = arg.match(SPLIT_ARG);
      const isArray = array === "[]";
      const result = {
        type: mainType,
        isPointer: pointer === "*",
        name,
        isArray,
        isArrayLength: i === rawFunctionArgs.length - 1 && prevIsArray,
        fullType: `${mainType}${pointer || ""}${array || ""}`,
      };
      prevIsArray = isArray;
      return result;
    });

    this.push({
      returnType,
      functionName,
      functionArgs,
      filename: this._currentFilename,
      package: this._currentPackage,
    });
  }

  _transform(line, encoding, done) {
    if (line.startsWith("/*")) {
      this._parseFilename(line);
    } else if (
      (line.startsWith("double") || line.startsWith("int")) &&
      !line.includes("register") &&
      !line.includes("void")
    ) {
      this._parseProto(line);
    } else if (line.startsWith("void") && line.match(/\bcmplx\b/)) {
      this._parseProto(line.replaceAll(COMPLEX_ARG, "Complex $2"));
    }
    done(null);
  }
}

function cprotoParser() {
  return pumpify.obj(split2(), new CprotoLineParser());
}

module.exports = cprotoParser;
