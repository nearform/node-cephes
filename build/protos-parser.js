
const split2 = require('split2');
const pumpify = require('pumpify');
const mappoint = require('mappoint');

var SPLIT_PROTO = /^(double|int) cephes_([a-z0-9]+)\(([A-Za-z0-9_ ,*\[\]]+)\);$/;
var SPLIT_ARG = /^(double|int) (\*)?(?:cephes_)?([A-Za-z0-9]+)(\[\])?$/;

function parser() {
  return pumpify.obj(
    split2(),
    mappoint({ objectMode: true }, function (proto, done) {
      const [
        , returnType, functionName, functionArgsStr
      ] = proto.match(SPLIT_PROTO);

      const functionArgs = functionArgsStr.split(/, ?/).map(function (arg) {
        const [, mainType, pointer, name, array] = arg.match(SPLIT_ARG);
        return {
          type: mainType,
          isPointer: pointer === '*',
          name: name,
          isArray: array === '[]',
          fullType: `${mainType}${pointer || ''}${array || ''}`
        };
      });

      done(null, {
        returnType,
        functionName,
        functionArgs
      });
    })
  );
}

module.exports = parser;
