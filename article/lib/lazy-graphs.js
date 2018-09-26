
const d3 = require('../d3.js');
const cephes = require('../../');

function linspace(start, stop, nsteps){
  const delta = (stop-start)/(nsteps-1);
  return d3.range(start, stop+delta, delta).slice(0, nsteps);
}

class LazyGraphs {
  constructor() {
    this._computed = new Map();
  }

  get(exampleNumber) {
    if (this._computed.has(exampleNumber)) {
      return this._computed.get(exampleNumber);
    }

    let data;
    switch (exampleNumber) {
      case 1:
        data = this._bessel();
        break;
      case 2:
        data = this._gamma();
        break;
      case 3:
        data = this._beta();
        break;
      case 4:
        data = this._ariy();
        break;
      default:
        throw new Error(`example ${exampleNumber} is not supported`);
    }

    this._computed.set(exampleNumber, data);
    return data;
  }

  _gamma() {
    const xInput = linspace(0.001, 5, 100);

    return {
      xDomain: [0.001, 5],
      yDomain: [-5, 5],
      lines: [{
        line: xInput.map((x) => [x, cephes.gamma(x)]),
        description: "Gamma(x)"
      }, {
        line: xInput.map((x) => [x, cephes.lgam(x)]),
        description: "ln(Gamma(x))"
      }, {
        line: xInput.map((x) => [x, cephes.psi(x)]),
        description: "DiGamma(x)"
      }]
    };
  }

  _beta() {
    const xInput = linspace(0.0001, 0.9999, 100);

    function betadist(alpha, beta, x) {
      return (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) / cephes.beta(alpha, beta);
    }

    return {
      xDomain: [0, 1],
      yDomain: [0, 2.5],
      lines: [{
        line: xInput.map((x) => [x, betadist(0.5, 0.5, x)]),
        description: "BetaDistribution(x; 0.5, 0.5)"
      }, {
        line: xInput.map((x) => [x, betadist(5, 1, x)]),
        description: "BetaDistribution(x; 5, 1)"
      }, {
        line: xInput.map((x) => [x, betadist(1, 3, x)]),
        description: "BetaDistribution(x; 1, 3)"
      }, {
        line: xInput.map((x) => [x, betadist(2, 2, x)]),
        description: "BetaDistribution(x; 2, 2)"
      }, {
        line: xInput.map((x) => [x, betadist(2, 5, x)]),
        description: "BetaDistribution(x; 2, 5)"
      }]
    };
  }

  _bessel() {
    const xInput = linspace(0, 20, 100);

    return {
      xDomain: [0, 20],
      yDomain: [-1, 1],
      lines: [{
        line: xInput.map((x) => [x, cephes.j0(x)]),
        description: "Bessel(0, x)"
      }, {
        line: xInput.map((x) => [x, cephes.jv(0.5, x)]),
        description: "Bessel(0.5, x)"
      }, {
        line: xInput.map((x) => [x, cephes.j1(x)]),
        description: "Bessel(1, x)"
      }, {
        line: xInput.map((x) => [x, cephes.jv(1.5, x)]),
        description: "Bessel(1.5, x)"
      }, {
        line: xInput.map((x) => [x, cephes.jv(2, x)]),
        description: "Bessel(2, x)"
      }]
    };
  }

  _ariy() {
    const xInput = linspace(-10, 5, 100);
    const yResult = xInput.map((x) => cephes.airy(x));

    return {
      xDomain: [-10, 5],
      yDomain: [-2, 2],
      lines: [{
        line: xInput.map(function (x, i) {
          const [ret, {ai, aip, bi, bip}] = yResult[i];
          return [x, ai];
        }),
        description: "Ai(x)"
      }, {
        line: xInput.map(function (x, i) {
          const [ret, {ai, aip, bi, bip}] = yResult[i];
          return [x, aip];
        }),
        description: "Ai'(x)"
      }, {
        line: xInput.map(function (x, i) {
          const [ret, {ai, aip, bi, bip}] = yResult[i];
          return [x, bi];
        }),
        description: "Bi(x)"
      }, {
        line: xInput.map(function (x, i) {
          const [ret, {ai, aip, bi, bip}] = yResult[i];
          return [x, bip];
        }),
        description: "Bi'(x)"
      }]
    };
  }
}

module.exports = LazyGraphs;
