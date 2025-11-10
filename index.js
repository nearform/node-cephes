
const cephes = require('./cephes.js');

// Export compiled promise, in Node.js this is just a dummy promise as the
// WebAssembly program will be compiled synchronously. It takes about 20ms
// as of Node.js v10.6.1.
exports.compiled = cephes.compiled;

// from cephes/isnan.c
exports.signbit = function signbit(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: int
  const fn_ret = cephes.cephes_signbit(carg_x) | 0;

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/isnan.c
exports.isnan = function isnan(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: int
  const fn_ret = cephes.cephes_isnan(carg_x) | 0;

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/isnan.c
exports.isfinite = function isfinite(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: int
  const fn_ret = cephes.cephes_isfinite(carg_x) | 0;

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/cbrt.c
exports.cbrt = function cbrt(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cbrt(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/polevl.c
exports.polevl = function polevl(/* double */ x, /* double[] */ coef, /* int */ N) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double[] coef
  if (!(coef instanceof Float64Array)) {
    cephes.stackRestore(stacktop);
    throw new TypeError('coef must be either a Float64Array');
  }
  const carg_coef = cephes.stackAlloc(coef.length << 3);
  cephes.writeArrayToMemory(new Uint8Array(coef.buffer, coef.byteOffset, coef.byteLength), carg_coef);

  // argument: int N
  if (typeof N !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('N must be a number');
  }
  const carg_N = N | 0;

  // return: double
  const fn_ret = cephes.cephes_polevl(carg_x, carg_coef, carg_N);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/chbevl.c
exports.chbevl = function chbevl(/* double */ x, /* double[] */ array, /* int */ n) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double[] array
  if (!(array instanceof Float64Array)) {
    cephes.stackRestore(stacktop);
    throw new TypeError('array must be either a Float64Array');
  }
  const carg_array = cephes.stackAlloc(array.length << 3);
  cephes.writeArrayToMemory(new Uint8Array(array.buffer, array.byteOffset, array.byteLength), carg_array);

  // argument: int n
  if (typeof n !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // return: double
  const fn_ret = cephes.cephes_chbevl(carg_x, carg_array, carg_n);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/round.c
exports.round = function round(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_round(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/floor.c
exports.frexp = function frexp(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: int* pw2
  const carg_pw2 = cephes.stackAlloc(4); // No need to zero-set it.

  // return: double
  const fn_ret = cephes.cephes_frexp(carg_x, carg_pw2);

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'pw2': cephes.getValue(carg_pw2, 'i32'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/floor.c
exports.ldexp = function ldexp(/* double */ x, /* int */ pw2) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: int pw2
  if (typeof pw2 !== 'number') {
    throw new TypeError('pw2 must be a number');
  }
  const carg_pw2 = pw2 | 0;

  // return: double
  const fn_ret = cephes.cephes_ldexp(carg_x, carg_pw2);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/expx2.c
exports.expx2 = function expx2(/* double */ x, /* int */ sign) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: int sign
  if (typeof sign !== 'number') {
    throw new TypeError('sign must be a number');
  }
  const carg_sign = sign | 0;

  // return: double
  const fn_ret = cephes.cephes_expx2(carg_x, carg_sign);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sin.c
exports.radian = function radian(/* double */ d, /* double */ m, /* double */ s) {
  // argument: double d
  if (typeof d !== 'number') {
    throw new TypeError('d must be a number');
  }
  const carg_d = d;

  // argument: double m
  if (typeof m !== 'number') {
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // argument: double s
  if (typeof s !== 'number') {
    throw new TypeError('s must be a number');
  }
  const carg_s = s;

  // return: double
  const fn_ret = cephes.cephes_radian(carg_d, carg_m, carg_s);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sincos.c
exports.sincos = function sincos(/* double */ x, /* int */ flg) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* s
  const carg_s = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* c
  const carg_c = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: int flg
  if (typeof flg !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('flg must be a number');
  }
  const carg_flg = flg | 0;

  // return: int
  const fn_ret = cephes.cephes_sincos(carg_x, carg_s, carg_c, carg_flg) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    's': cephes.getValue(carg_s, 'double'),
    'c': cephes.getValue(carg_c, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/tan.c
exports.cot = function cot(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cot(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/tandg.c
exports.cotdg = function cotdg(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cotdg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/unity.c
exports.log1p = function log1p(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_log1p(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/unity.c
exports.expm1 = function expm1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_expm1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/unity.c
exports.cosm1 = function cosm1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cosm1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/asin.c
exports.acos = function acos(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_acos(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/acosh.c
exports.acosh = function acosh(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_acosh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/asinh.c
exports.asinh = function asinh(/* double */ xx) {
  // argument: double xx
  if (typeof xx !== 'number') {
    throw new TypeError('xx must be a number');
  }
  const carg_xx = xx;

  // return: double
  const fn_ret = cephes.cephes_asinh(carg_xx);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/atanh.c
exports.atanh = function atanh(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_atanh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/asin.c
exports.asin = function asin(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_asin(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/atan.c
exports.atan = function atan(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_atan(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/atan.c
exports.atan2 = function atan2(/* double */ y, /* double */ x) {
  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_atan2(carg_y, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sin.c
exports.cos = function cos(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cos(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sindg.c
exports.cosdg = function cosdg(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cosdg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/exp.c
exports.exp = function exp(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_exp(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/exp2.c
exports.exp2 = function exp2(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_exp2(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/exp10.c
exports.exp10 = function exp10(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_exp10(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/cosh.c
exports.cosh = function cosh(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cosh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sinh.c
exports.sinh = function sinh(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_sinh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/tanh.c
exports.tanh = function tanh(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_tanh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/log.c
exports.log = function log(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_log(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/log2.c
exports.log2 = function log2(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_log2(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/log10.c
exports.log10 = function log10(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_log10(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/pow.c
exports.pow = function pow(/* double */ x, /* double */ y) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_pow(carg_x, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/powi.c
exports.powi = function powi(/* double */ x, /* int */ nn) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: int nn
  if (typeof nn !== 'number') {
    throw new TypeError('nn must be a number');
  }
  const carg_nn = nn | 0;

  // return: double
  const fn_ret = cephes.cephes_powi(carg_x, carg_nn);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sin.c
exports.sin = function sin(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_sin(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sindg.c
exports.sindg = function sindg(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_sindg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/tan.c
exports.tan = function tan(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_tan(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/tandg.c
exports.tandg = function tandg(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_tandg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ei.c
exports.ei = function ei(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_ei(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/expn.c
exports.expn = function expn(/* int */ n, /* double */ x) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_expn(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/shichi.c
exports.shichi = function shichi(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* si
  const carg_si = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* ci
  const carg_ci = cephes.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes.cephes_shichi(carg_x, carg_si, carg_ci) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'si': cephes.getValue(carg_si, 'double'),
    'ci': cephes.getValue(carg_ci, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/sici.c
exports.sici = function sici(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* si
  const carg_si = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* ci
  const carg_ci = cephes.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes.cephes_sici(carg_x, carg_si, carg_ci) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'si': cephes.getValue(carg_si, 'double'),
    'ci': cephes.getValue(carg_ci, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/beta.c
exports.lbeta = function lbeta(/* double */ a, /* double */ b) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // return: double
  const fn_ret = cephes.cephes_lbeta(carg_a, carg_b);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/beta.c
exports.beta = function beta(/* double */ a, /* double */ b) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // return: double
  const fn_ret = cephes.cephes_beta(carg_a, carg_b);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/fac.c
exports.fac = function fac(/* int */ i) {
  // argument: int i
  if (typeof i !== 'number') {
    throw new TypeError('i must be a number');
  }
  const carg_i = i | 0;

  // return: double
  const fn_ret = cephes.cephes_fac(carg_i);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/gamma.c
exports.gamma = function gamma(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_gamma(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/gamma.c
exports.lgam = function lgam(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_lgam(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/incbet.c
exports.incbet = function incbet(/* double */ aa, /* double */ bb, /* double */ xx) {
  // argument: double aa
  if (typeof aa !== 'number') {
    throw new TypeError('aa must be a number');
  }
  const carg_aa = aa;

  // argument: double bb
  if (typeof bb !== 'number') {
    throw new TypeError('bb must be a number');
  }
  const carg_bb = bb;

  // argument: double xx
  if (typeof xx !== 'number') {
    throw new TypeError('xx must be a number');
  }
  const carg_xx = xx;

  // return: double
  const fn_ret = cephes.cephes_incbet(carg_aa, carg_bb, carg_xx);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/incbi.c
exports.incbi = function incbi(/* double */ aa, /* double */ bb, /* double */ yy0) {
  // argument: double aa
  if (typeof aa !== 'number') {
    throw new TypeError('aa must be a number');
  }
  const carg_aa = aa;

  // argument: double bb
  if (typeof bb !== 'number') {
    throw new TypeError('bb must be a number');
  }
  const carg_bb = bb;

  // argument: double yy0
  if (typeof yy0 !== 'number') {
    throw new TypeError('yy0 must be a number');
  }
  const carg_yy0 = yy0;

  // return: double
  const fn_ret = cephes.cephes_incbi(carg_aa, carg_bb, carg_yy0);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/igam.c
exports.igam = function igam(/* double */ a, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_igam(carg_a, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/igam.c
exports.igamc = function igamc(/* double */ a, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_igamc(carg_a, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/igami.c
exports.igami = function igami(/* double */ a, /* double */ y0) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double y0
  if (typeof y0 !== 'number') {
    throw new TypeError('y0 must be a number');
  }
  const carg_y0 = y0;

  // return: double
  const fn_ret = cephes.cephes_igami(carg_a, carg_y0);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/psi.c
exports.psi = function psi(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_psi(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/rgamma.c
exports.rgamma = function rgamma(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_rgamma(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ndtr.c
exports.erf = function erf(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_erf(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ndtr.c
exports.erfc = function erfc(/* double */ a) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // return: double
  const fn_ret = cephes.cephes_erfc(carg_a);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/dawsn.c
exports.dawsn = function dawsn(/* double */ xx) {
  // argument: double xx
  if (typeof xx !== 'number') {
    throw new TypeError('xx must be a number');
  }
  const carg_xx = xx;

  // return: double
  const fn_ret = cephes.cephes_dawsn(carg_xx);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/fresnl.c
exports.fresnl = function fresnl(/* double */ xxa) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double xxa
  if (typeof xxa !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('xxa must be a number');
  }
  const carg_xxa = xxa;

  // argument: double* ssa
  const carg_ssa = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* cca
  const carg_cca = cephes.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes.cephes_fresnl(carg_xxa, carg_ssa, carg_cca) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'ssa': cephes.getValue(carg_ssa, 'double'),
    'cca': cephes.getValue(carg_cca, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/airy.c
exports.airy = function airy(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* ai
  const carg_ai = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* aip
  const carg_aip = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* bi
  const carg_bi = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* bip
  const carg_bip = cephes.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes.cephes_airy(carg_x, carg_ai, carg_aip, carg_bi, carg_bip) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'ai': cephes.getValue(carg_ai, 'double'),
    'aip': cephes.getValue(carg_aip, 'double'),
    'bi': cephes.getValue(carg_bi, 'double'),
    'bip': cephes.getValue(carg_bip, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/j0.c
exports.j0 = function j0(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_j0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/j1.c
exports.j1 = function j1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_j1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/jn.c
exports.jn = function jn(/* int */ n, /* double */ x) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_jn(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/jv.c
exports.jv = function jv(/* double */ n, /* double */ x) {
  // argument: double n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_jv(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/j0.c
exports.y0 = function y0(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_y0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/j1.c
exports.y1 = function y1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_y1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/yn.c
exports.yn = function yn(/* int */ n, /* double */ x) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_yn(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/struve.c
exports.yv = function yv(/* double */ v, /* double */ x) {
  // argument: double v
  if (typeof v !== 'number') {
    throw new TypeError('v must be a number');
  }
  const carg_v = v;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_yv(carg_v, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/i0.c
exports.i0 = function i0(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_i0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/i0.c
exports.i0e = function i0e(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_i0e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/i1.c
exports.i1 = function i1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_i1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/i1.c
exports.i1e = function i1e(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_i1e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/iv.c
exports.iv = function iv(/* double */ v, /* double */ x) {
  // argument: double v
  if (typeof v !== 'number') {
    throw new TypeError('v must be a number');
  }
  const carg_v = v;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_iv(carg_v, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/k0.c
exports.k0 = function k0(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_k0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/k0.c
exports.k0e = function k0e(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_k0e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/k1.c
exports.k1 = function k1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_k1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/k1.c
exports.k1e = function k1e(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_k1e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/kn.c
exports.kn = function kn(/* int */ nn, /* double */ x) {
  // argument: int nn
  if (typeof nn !== 'number') {
    throw new TypeError('nn must be a number');
  }
  const carg_nn = nn | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_kn(carg_nn, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/hyperg.c
exports.hyperg = function hyperg(/* double */ a, /* double */ b, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_hyperg(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/hyp2f1.c
exports.hyp2f1 = function hyp2f1(/* double */ a, /* double */ b, /* double */ c, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // argument: double c
  if (typeof c !== 'number') {
    throw new TypeError('c must be a number');
  }
  const carg_c = c;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_hyp2f1(carg_a, carg_b, carg_c, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ellpe.c
exports.ellpe = function ellpe(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_ellpe(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ellie.c
exports.ellie = function ellie(/* double */ phi, /* double */ m) {
  // argument: double phi
  if (typeof phi !== 'number') {
    throw new TypeError('phi must be a number');
  }
  const carg_phi = phi;

  // argument: double m
  if (typeof m !== 'number') {
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes.cephes_ellie(carg_phi, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ellpk.c
exports.ellpk = function ellpk(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_ellpk(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ellik.c
exports.ellik = function ellik(/* double */ phi, /* double */ m) {
  // argument: double phi
  if (typeof phi !== 'number') {
    throw new TypeError('phi must be a number');
  }
  const carg_phi = phi;

  // argument: double m
  if (typeof m !== 'number') {
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes.cephes_ellik(carg_phi, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ellpj.c
exports.ellpj = function ellpj(/* double */ u, /* double */ m) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double u
  if (typeof u !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('u must be a number');
  }
  const carg_u = u;

  // argument: double m
  if (typeof m !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // argument: double* sn
  const carg_sn = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* cn
  const carg_cn = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* dn
  const carg_dn = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* ph
  const carg_ph = cephes.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes.cephes_ellpj(carg_u, carg_m, carg_sn, carg_cn, carg_dn, carg_ph) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'sn': cephes.getValue(carg_sn, 'double'),
    'cn': cephes.getValue(carg_cn, 'double'),
    'dn': cephes.getValue(carg_dn, 'double'),
    'ph': cephes.getValue(carg_ph, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/btdtr.c
exports.btdtr = function btdtr(/* double */ a, /* double */ b, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_btdtr(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/kolmogorov.c
exports.smirnov = function smirnov(/* int */ n, /* double */ e) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double e
  if (typeof e !== 'number') {
    throw new TypeError('e must be a number');
  }
  const carg_e = e;

  // return: double
  const fn_ret = cephes.cephes_smirnov(carg_n, carg_e);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/kolmogorov.c
exports.kolmogorov = function kolmogorov(/* double */ y) {
  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_kolmogorov(carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/kolmogorov.c
exports.smirnovi = function smirnovi(/* int */ n, /* double */ p) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_smirnovi(carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/kolmogorov.c
exports.kolmogi = function kolmogi(/* double */ p) {
  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_kolmogi(carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/nbdtr.c
exports.nbdtri = function nbdtri(/* int */ k, /* int */ n, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_nbdtri(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/stdtr.c
exports.stdtri = function stdtri(/* int */ k, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_stdtri(carg_k, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/bdtr.c
exports.bdtr = function bdtr(/* int */ k, /* int */ n, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_bdtr(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/bdtr.c
exports.bdtrc = function bdtrc(/* int */ k, /* int */ n, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_bdtrc(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/bdtr.c
exports.bdtri = function bdtri(/* int */ k, /* int */ n, /* double */ y) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_bdtri(carg_k, carg_n, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/chdtr.c
exports.chdtr = function chdtr(/* double */ df, /* double */ x) {
  // argument: double df
  if (typeof df !== 'number') {
    throw new TypeError('df must be a number');
  }
  const carg_df = df;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_chdtr(carg_df, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/chdtr.c
exports.chdtrc = function chdtrc(/* double */ df, /* double */ x) {
  // argument: double df
  if (typeof df !== 'number') {
    throw new TypeError('df must be a number');
  }
  const carg_df = df;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_chdtrc(carg_df, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/chdtr.c
exports.chdtri = function chdtri(/* double */ df, /* double */ y) {
  // argument: double df
  if (typeof df !== 'number') {
    throw new TypeError('df must be a number');
  }
  const carg_df = df;

  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_chdtri(carg_df, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/fdtr.c
exports.fdtr = function fdtr(/* int */ ia, /* int */ ib, /* double */ x) {
  // argument: int ia
  if (typeof ia !== 'number') {
    throw new TypeError('ia must be a number');
  }
  const carg_ia = ia | 0;

  // argument: int ib
  if (typeof ib !== 'number') {
    throw new TypeError('ib must be a number');
  }
  const carg_ib = ib | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_fdtr(carg_ia, carg_ib, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/fdtr.c
exports.fdtrc = function fdtrc(/* int */ ia, /* int */ ib, /* double */ x) {
  // argument: int ia
  if (typeof ia !== 'number') {
    throw new TypeError('ia must be a number');
  }
  const carg_ia = ia | 0;

  // argument: int ib
  if (typeof ib !== 'number') {
    throw new TypeError('ib must be a number');
  }
  const carg_ib = ib | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_fdtrc(carg_ia, carg_ib, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/fdtr.c
exports.fdtri = function fdtri(/* int */ ia, /* int */ ib, /* double */ y) {
  // argument: int ia
  if (typeof ia !== 'number') {
    throw new TypeError('ia must be a number');
  }
  const carg_ia = ia | 0;

  // argument: int ib
  if (typeof ib !== 'number') {
    throw new TypeError('ib must be a number');
  }
  const carg_ib = ib | 0;

  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_fdtri(carg_ia, carg_ib, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/gdtr.c
exports.gdtr = function gdtr(/* double */ a, /* double */ b, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_gdtr(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/gdtr.c
exports.gdtrc = function gdtrc(/* double */ a, /* double */ b, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_gdtrc(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/nbdtr.c
exports.nbdtr = function nbdtr(/* int */ k, /* int */ n, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_nbdtr(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/nbdtr.c
exports.nbdtrc = function nbdtrc(/* int */ k, /* int */ n, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_nbdtrc(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ndtr.c
exports.ndtr = function ndtr(/* double */ a) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // return: double
  const fn_ret = cephes.cephes_ndtr(carg_a);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ndtri.c
exports.ndtri = function ndtri(/* double */ y0) {
  // argument: double y0
  if (typeof y0 !== 'number') {
    throw new TypeError('y0 must be a number');
  }
  const carg_y0 = y0;

  // return: double
  const fn_ret = cephes.cephes_ndtri(carg_y0);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/pdtr.c
exports.pdtr = function pdtr(/* int */ k, /* double */ m) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: double m
  if (typeof m !== 'number') {
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes.cephes_pdtr(carg_k, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/pdtr.c
exports.pdtrc = function pdtrc(/* int */ k, /* double */ m) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: double m
  if (typeof m !== 'number') {
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes.cephes_pdtrc(carg_k, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/pdtr.c
exports.pdtri = function pdtri(/* int */ k, /* double */ y) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_pdtri(carg_k, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/stdtr.c
exports.stdtr = function stdtr(/* int */ k, /* double */ t) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: double t
  if (typeof t !== 'number') {
    throw new TypeError('t must be a number');
  }
  const carg_t = t;

  // return: double
  const fn_ret = cephes.cephes_stdtr(carg_k, carg_t);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/planck.c
exports.plancki = function plancki(/* double */ w, /* double */ T) {
  // argument: double w
  if (typeof w !== 'number') {
    throw new TypeError('w must be a number');
  }
  const carg_w = w;

  // argument: double T
  if (typeof T !== 'number') {
    throw new TypeError('T must be a number');
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes.cephes_plancki(carg_w, carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/planck.c
exports.planckc = function planckc(/* double */ w, /* double */ T) {
  // argument: double w
  if (typeof w !== 'number') {
    throw new TypeError('w must be a number');
  }
  const carg_w = w;

  // argument: double T
  if (typeof T !== 'number') {
    throw new TypeError('T must be a number');
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes.cephes_planckc(carg_w, carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/planck.c
exports.planckd = function planckd(/* double */ w, /* double */ T) {
  // argument: double w
  if (typeof w !== 'number') {
    throw new TypeError('w must be a number');
  }
  const carg_w = w;

  // argument: double T
  if (typeof T !== 'number') {
    throw new TypeError('T must be a number');
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes.cephes_planckd(carg_w, carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/planck.c
exports.planckw = function planckw(/* double */ T) {
  // argument: double T
  if (typeof T !== 'number') {
    throw new TypeError('T must be a number');
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes.cephes_planckw(carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/spence.c
exports.spence = function spence(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_spence(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/zetac.c
exports.zetac = function zetac(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_zetac(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/zeta.c
exports.zeta = function zeta(/* double */ x, /* double */ q) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double q
  if (typeof q !== 'number') {
    throw new TypeError('q must be a number');
  }
  const carg_q = q;

  // return: double
  const fn_ret = cephes.cephes_zeta(carg_x, carg_q);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/struve.c
exports.struve = function struve(/* double */ v, /* double */ x) {
  // argument: double v
  if (typeof v !== 'number') {
    throw new TypeError('v must be a number');
  }
  const carg_v = v;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_struve(carg_v, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/polevl.c
exports.p1evl = function p1evl(/* double */ x, /* double[] */ coef, /* int */ N) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double[] coef
  if (!(coef instanceof Float64Array)) {
    cephes.stackRestore(stacktop);
    throw new TypeError('coef must be either a Float64Array');
  }
  const carg_coef = cephes.stackAlloc(coef.length << 3);
  cephes.writeArrayToMemory(new Uint8Array(coef.buffer, coef.byteOffset, coef.byteLength), carg_coef);

  // argument: int N
  if (typeof N !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('N must be a number');
  }
  const carg_N = N | 0;

  // return: double
  const fn_ret = cephes.cephes_p1evl(carg_x, carg_coef, carg_N);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/polylog.c
exports.polylog = function polylog(/* int */ n, /* double */ x) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_polylog(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

