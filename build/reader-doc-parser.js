
const stream = require('stream');
const split2 = require('split2');
const pumpify = require('pumpify');
const EXTRA_DOCUMENTATION = require('./extra-documentation.js');

let constant_counter = 0;
const STATE_INIT = constant_counter++;
const STATE_HEADER_FOUND_SKIP_NEXT = constant_counter++;
const STATE_BODY = constant_counter++;
const STATE_LAST_LINE_EMPTY = constant_counter++;
const STATE_FOOTER = constant_counter++;

const SPLIT_DOC = /^((?:[A-Za-z0-9,.'-]+| (?! )|\(digamma\))+) (\([A-Za-z']+\))? *([a-z0-9]+)/


class DocLineParser extends stream.Transform {
  constructor() {
    super({ objectMode: true });

    this._state = STATE_INIT;
    this._category = '';
    this._emittedFunctionNames = new Set();
  }

  _setBodyCategory(line) {
    this._category = line;
    if (EXTRA_DOCUMENTATION.has(this._category)) {
      for (const extraDoc of EXTRA_DOCUMENTATION.get(this._category)) {
        this._emittedFunctionNames.add(extraDoc.functionName);
        this.push(extraDoc);
      }
    }
  }

  _parseBodyContent(line) {
    const match = line.match(SPLIT_DOC);
    if (match === null) return;

    const [, description, extra, functionName] = match;

    // Ensure that dublicate don't appear
    if (!this._emittedFunctionNames.has(functionName)) {
      this._emittedFunctionNames.add(functionName);
      this.push({
        category: this._category,
        description: description,
        functionName: functionName
      });
    }
  }

  _parseBody(line) {
    if (line.startsWith('   ')) {
      this._setBodyCategory(line.trim());
    } else {
      this._parseBodyContent(line.trim());
    }
  }

  _transform(line, encoding, done) {
    switch (this._state) {
      case STATE_INIT:
        if (line.startsWith('--------')) {
          this._state = STATE_HEADER_FOUND_SKIP_NEXT;
        }
        break;

      case STATE_HEADER_FOUND_SKIP_NEXT:
        this._state = STATE_BODY;
        break;

      case STATE_BODY:
        if (line === '') {
          this._state = STATE_LAST_LINE_EMPTY;
        } else {
          this._parseBody(line);
        }
        break;

      case STATE_LAST_LINE_EMPTY:
        if (line === '') {
          this._state = STATE_FOOTER;
        } else {
          this._state = STATE_BODY;
          this._parseBody(line);
        }
        break;

      case STATE_FOOTER:
        break;

      default:
        throw new Error(`unknown state ${this._state}`);
    }

    done(null);
  }

  _flush(done) {
    this._setBodyCategory('Polynomials and Power Series');
    done(null);
  }
}

function docParser() {
  return pumpify.obj(
    split2(),
    new DocLineParser()
  );
}

module.exports = docParser;
