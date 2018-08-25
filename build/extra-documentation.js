
// Unfortunetly the documentation is incomplete
module.exports = new Map([
  [
    'Gamma',
    [{
      category: 'Gamma',
      functionName: 'lbeta',
      description: 'Natural log of |beta|.'
    }]
  ],
  [
    'Probability',
    [{
      category: 'Probability',
      functionName: 'btdtr',
      description: 'Beta distribution'
    }, {
      category: 'Probability',
      functionName: 'smirnov',
      description: 'Exact Smirnov statistic, for one-sided test.'
    }, {
      category: 'Probability',
      functionName: 'kolmogorov',
      description: 'Kolmogorov\'s limiting distribution of two-sided test.'
    }, {
      category: 'Probability',
      functionName: 'smirnovi',
      description: 'Functional inverse of Smirnov distribution.'
    }, {
      category: 'Probability',
      functionName: 'kolmogi',
      description: 'Functional inverse of Kolmogorov statistic for two-sided test.'
    }, {
      category: 'Probability',
      functionName: 'nbdtri',
      description: 'Inverse Negative binomial distribution'
    }, {
      category: 'Probability',
      functionName: 'stdtri',
      description: 'Functional inverse of Student\'s t distribution'
    }]
  ],
  [
    'Exponential integral',
    [{
      category: 'Exponential integral',
      functionName: 'ei',
      description: 'Exponential integral'
    }]
  ],
  [
    'Exponential and Trigonometric',
    [{
      category: 'Exponential and Trigonometric',
      functionName: 'expx2',
      description: 'Exponential of squared argument'
    }, {
      category: 'Exponential and Trigonometric',
      functionName: 'radian',
      description: 'Degrees, minutes, seconds to radians'
    }, {
      category: 'Exponential and Trigonometric',
      functionName: 'sincos',
      description: 'Circular sine and cosine of argument in degrees'
    }, {
      category: 'Exponential and Trigonometric',
      functionName: 'cot',
      description: 'Circular cotangent'
    }, {
      category: 'Exponential and Trigonometric',
      functionName: 'cotdg',
      description: 'Circular cotangent of argument in degrees'
    }, {
      category: 'Exponential and Trigonometric',
      functionName: 'log1p',
      description: 'Relative error approximations for log(1 + x)'
    }, {
      category: 'Exponential and Trigonometric',
      functionName: 'expm1',
      description: 'Relative error approximations for exp(x) - 1'
    }, {
      category: 'Exponential and Trigonometric',
      functionName: 'cosm1',
      description: 'Relative error approximations for cos(x) - 1'
    }]
  ],
  [
    'Arithmetic and Algebraic',
    [{
      category: 'Arithmetic and Algebraic',
      functionName: 'signbit',
      description: 'Returns the sign bit'
    }, {
      category: 'Arithmetic and Algebraic',
      functionName: 'isnan',
      description: 'Check if Not-A-Number'
    }, {
      category: 'Arithmetic and Algebraic',
      functionName: 'isfinite',
      description: 'Check if finite'
    }]
  ],
  [
    'Miscellaneous',
    [{
      category: 'Miscellaneous',
      functionName: 'plancki',
      description: 'Integral of Planck\'s black body radiation formula'
    }, {
      category: 'Miscellaneous',
      functionName: 'planckc',
      description: 'Complemented Planck radiation integral'
    }, {
      category: 'Miscellaneous',
      functionName: 'planckd',
      description: 'Planck\'s black body radiation formula'
    }, {
      category: 'Miscellaneous',
      functionName: 'planckw',
      description: 'Wavelength, w, of maximum radiation at given temperature T.'
    }]
  ],
  [
    'Polynomials and Power Series',
    [{
      category: 'Polynomials and Power Series',
      functionName: 'p1evl',
      description: 'Evaluate polynomial when coefficient of x is 1.0.'
    }, {
      category: 'Polynomials and Power Series',
      functionName: 'polylog',
      description: 'The polylogarithm of order n'
    }]
  ]
]);
