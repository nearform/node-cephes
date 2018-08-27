
const almostEqual = require('almost-equal');

function tapAlmostEqual(t, a, b, { atol=1e-8, rtol=1e-5 } = {}) {
  var result = almostEqual(a, b, atol, rtol);
  if (result) {
    t.ok(true, `${a} is almost equal to ${b}`);
  } else {
    t.ok(false, `${a} is not almost equal to ${b}`);
  }
}

module.exports = tapAlmostEqual;
