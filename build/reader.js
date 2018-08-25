
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const split2 = require('split2');
const pumpify = require('pumpify');

const cprotoParser = require('./reader-cproto-parser.js');
const docParser = require('./reader-doc-parser.js');

const DOC_FILE = path.resolve(__dirname, '..', 'cephes', 'cephes.txt');

const INTERNAL_CEPHES_FUNCTIONS = new Set([
  'hyp2f0', 'onef2', 'threef0'
]);

class MergeDocumentation extends stream.Transform {
  constructor() {
    super({ objectMode: true });

    this._prototypes = new Map();

    this._documentationEnded = false;
    this._documentation = [];

    this._documentationStream = fs.createReadStream(DOC_FILE)
      .pipe(docParser())
      .on('data', (doc) => this._documentation.push(doc))
      .once('end', (err) => this._documentationEnded = true)
      .on('error', (err) => this.emit('error', err));
  }

  _transform(proto, encoding, done) {
    this._prototypes.set(proto.functionName, proto);
    done(null);
  }

  _finish(done) {
    // Validate that no documentation is missing
    const documentationParts = new Set(
      this._documentation.map((doc) => doc.functionName)
    );
    for (const protoFunctionName of this._prototypes.keys()) {
      if (INTERNAL_CEPHES_FUNCTIONS.has(protoFunctionName)) continue;

      if (!documentationParts.has(protoFunctionName)) {
        throw new Error(`documentation for ${protoFunctionName} is missing`);
      }
    }

    // Merge data
    // The order of the documentation stream is meaninful, so use the
    // documentation as the order and merge in the prototypes.
    for (const doc of this._documentation) {
      if (INTERNAL_CEPHES_FUNCTIONS.has(doc.functionName)) continue;

      if (this._prototypes.has(doc.functionName)) {
        this.push(
          Object.assign({}, doc, this._prototypes.get(doc.functionName))
        );
      }
    }

    done(null);
  }

  _flush(done) {
    if (this._documentationEnded) {
      process.nextTick(() => this._finish(done));
    } else {
      this._documentationStream.once('end', () => this._finish(done));
    }
  }
}


function parser() {
  return pumpify.obj(
    cprotoParser(),
    new MergeDocumentation()
  );
}

module.exports = parser;
