const assert = require('node:assert')
const almostEqual = require('almost-equal');

function testAlmostEqual(a, b, { atol=1e-8, rtol=1e-5 } = {}) {
  var result = almostEqual(a, b, atol, rtol);
  if (result) {
    assert.ok(true, `${a} is almost equal to ${b}`);
  } else {
    assert.ok(false, `${a} is not almost equal to ${b}`);
  }
}

module.exports = testAlmostEqual;
