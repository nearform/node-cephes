
const cephes = require('./cephes.cjs');

// Export compiled promise, in Node.js this is just a dummy promise as the
// WebAssembly program will be compiled synchronously. It takes about 20ms
// as of Node.js v10.6.1.
const compiled = cephes.compiled ?? Promise.resolve()
// from cephes/cmath/isnan.c
function signbit(/* double */ x) {
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

// from cephes/cmath/isnan.c
function isnan(/* double */ x) {
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

// from cephes/cmath/isnan.c
function isfinite(/* double */ x) {
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

// from cephes/cmath/sqrt.c
function sqrt(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_sqrt(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/cmath/cbrt.c
function cbrt(/* double */ x) {
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

// from cephes/misc/polevl.c
function polevl(/* double */ x, /* double[] */ coef, /* int */ N) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double[] coef
  if (!(coef instanceof Float64Array)) {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('coef must be either a Float64Array');
  }
  const carg_coef = cephes.misc.stackAlloc(coef.length << 3);
  cephes.misc.writeArrayToMemory(new Uint8Array(coef.buffer, coef.byteOffset, coef.byteLength), carg_coef);

  // argument: int N
  if (typeof N !== 'number') {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('N must be a number');
  }
  const carg_N = N | 0;

  // return: double
  const fn_ret = cephes.cephes_polevl(carg_x, carg_coef, carg_N);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  // Restore internal stacktop before returning
  cephes.misc.stackRestore(stacktop);
  return ret;
};

// from cephes/misc/chbevl.c
function chbevl(/* double */ x, /* double[] */ array, /* int */ n) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double[] array
  if (!(array instanceof Float64Array)) {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('array must be either a Float64Array');
  }
  const carg_array = cephes.misc.stackAlloc(array.length << 3);
  cephes.misc.writeArrayToMemory(new Uint8Array(array.buffer, array.byteOffset, array.byteLength), carg_array);

  // argument: int n
  if (typeof n !== 'number') {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // return: double
  const fn_ret = cephes.cephes_chbevl(carg_x, carg_array, carg_n);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  // Restore internal stacktop before returning
  cephes.misc.stackRestore(stacktop);
  return ret;
};

// from cephes/cmath/round.c
function round(/* double */ x) {
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

// from cephes/cmath/floor.c
function ceil(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_ceil(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/cmath/floor.c
function floor(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_floor(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/cmath/floor.c
function frexp(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.cmath.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: int* pw2
  const carg_pw2 = cephes.cmath.stackAlloc(4); // No need to zero-set it.

  // return: double
  const fn_ret = cephes.cephes_frexp(carg_x, carg_pw2);

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'pw2': cephes.cmath.getValue(carg_pw2, 'i32'),
  }];

  // Restore internal stacktop before returning
  cephes.cmath.stackRestore(stacktop);
  return ret;
};

// from cephes/cmath/floor.c
function ldexp(/* double */ x, /* int */ pw2) {
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

// from cephes/cmath/fabs.c
function fabs(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_fabs(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/cprob/expx2.c
function expx2(/* double */ x, /* int */ sign) {
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

// from cephes/cmath/sin.c
function radian(/* double */ d, /* double */ m, /* double */ s) {
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

// from cephes/cmath/sincos.c
function sincos(/* double */ x, /* int */ flg) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.cmath.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* s
  const carg_s = cephes.cmath.stackAlloc(8); // No need to zero-set it.

  // argument: double* c
  const carg_c = cephes.cmath.stackAlloc(8); // No need to zero-set it.

  // argument: int flg
  if (typeof flg !== 'number') {
    cephes.cmath.stackRestore(stacktop);
    throw new TypeError('flg must be a number');
  }
  const carg_flg = flg | 0;

  // return: int
  const fn_ret = cephes.cephes_sincos(carg_x, carg_s, carg_c, carg_flg) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    's': cephes.cmath.getValue(carg_s, 'double'),
    'c': cephes.cmath.getValue(carg_c, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.cmath.stackRestore(stacktop);
  return ret;
};

// from cephes/cmath/tan.c
function cot(/* double */ x) {
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

// from cephes/cmath/tandg.c
function cotdg(/* double */ x) {
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

// from cephes/cprob/unity.c
function log1p(/* double */ x) {
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

// from cephes/cprob/unity.c
function expm1(/* double */ x) {
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

// from cephes/cprob/unity.c
function cosm1(/* double */ x) {
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

// from cephes/cmath/asin.c
function acos(/* double */ x) {
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

// from cephes/cmath/acosh.c
function acosh(/* double */ x) {
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

// from cephes/cmath/asinh.c
function asinh(/* double */ xx) {
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

// from cephes/cmath/atanh.c
function atanh(/* double */ x) {
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

// from cephes/cmath/asin.c
function asin(/* double */ x) {
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

// from cephes/cmath/atan.c
function atan(/* double */ x) {
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

// from cephes/cmath/atan.c
function atan2(/* double */ y, /* double */ x) {
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

// from cephes/cmath/sin.c
function cos(/* double */ x) {
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

// from cephes/cmath/sindg.c
function cosdg(/* double */ x) {
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

// from cephes/cmath/exp.c
function exp(/* double */ x) {
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

// from cephes/cmath/exp2.c
function exp2(/* double */ x) {
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

// from cephes/cmath/exp10.c
function exp10(/* double */ x) {
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

// from cephes/cmath/cosh.c
function cosh(/* double */ x) {
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

// from cephes/cmath/sinh.c
function sinh(/* double */ x) {
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

// from cephes/cmath/tanh.c
function tanh(/* double */ x) {
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

// from cephes/cmath/log.c
function log(/* double */ x) {
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

// from cephes/cmath/log2.c
function log2(/* double */ x) {
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

// from cephes/cmath/log10.c
function log10(/* double */ x) {
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

// from cephes/cmath/pow.c
function pow(/* double */ x, /* double */ y) {
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

// from cephes/cmath/powi.c
function powi(/* double */ x, /* int */ nn) {
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

// from cephes/cmath/sin.c
function sin(/* double */ x) {
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

// from cephes/cmath/sindg.c
function sindg(/* double */ x) {
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

// from cephes/cmath/tan.c
function tan(/* double */ x) {
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

// from cephes/cmath/tandg.c
function tandg(/* double */ x) {
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

// from cephes/misc/ei.c
function ei(/* double */ x) {
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

// from cephes/misc/expn.c
function expn(/* int */ n, /* double */ x) {
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

// from cephes/misc/shichi.c
function shichi(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* si
  const carg_si = cephes.misc.stackAlloc(8); // No need to zero-set it.

  // argument: double* ci
  const carg_ci = cephes.misc.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes.cephes_shichi(carg_x, carg_si, carg_ci) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'si': cephes.misc.getValue(carg_si, 'double'),
    'ci': cephes.misc.getValue(carg_ci, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.misc.stackRestore(stacktop);
  return ret;
};

// from cephes/misc/sici.c
function sici(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* si
  const carg_si = cephes.misc.stackAlloc(8); // No need to zero-set it.

  // argument: double* ci
  const carg_ci = cephes.misc.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes.cephes_sici(carg_x, carg_si, carg_ci) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'si': cephes.misc.getValue(carg_si, 'double'),
    'ci': cephes.misc.getValue(carg_ci, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.misc.stackRestore(stacktop);
  return ret;
};

// from cephes/misc/beta.c
function lbeta(/* double */ a, /* double */ b) {
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

// from cephes/misc/beta.c
function beta(/* double */ a, /* double */ b) {
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

// from cephes/misc/fac.c
function fac(/* int */ i) {
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

// from cephes/cprob/gamma.c
function gamma(/* double */ x) {
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

// from cephes/cprob/gamma.c
function lgam(/* double */ x) {
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

// from cephes/cprob/incbet.c
function incbet(/* double */ aa, /* double */ bb, /* double */ xx) {
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

// from cephes/cprob/incbi.c
function incbi(/* double */ aa, /* double */ bb, /* double */ yy0) {
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

// from cephes/cprob/igam.c
function igam(/* double */ a, /* double */ x) {
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

// from cephes/cprob/igam.c
function igamc(/* double */ a, /* double */ x) {
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

// from cephes/cprob/igami.c
function igami(/* double */ a, /* double */ y0) {
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

// from cephes/misc/psi.c
function psi(/* double */ x) {
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

// from cephes/misc/rgamma.c
function rgamma(/* double */ x) {
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

// from cephes/cprob/ndtr.c
function erf(/* double */ x) {
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

// from cephes/cprob/ndtr.c
function erfc(/* double */ a) {
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

// from cephes/misc/dawsn.c
function dawsn(/* double */ xx) {
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

// from cephes/misc/fresnl.c
function fresnl(/* double */ xxa) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();

  // argument: double xxa
  if (typeof xxa !== 'number') {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('xxa must be a number');
  }
  const carg_xxa = xxa;

  // argument: double* ssa
  const carg_ssa = cephes.misc.stackAlloc(8); // No need to zero-set it.

  // argument: double* cca
  const carg_cca = cephes.misc.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes.cephes_fresnl(carg_xxa, carg_ssa, carg_cca) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'ssa': cephes.misc.getValue(carg_ssa, 'double'),
    'cca': cephes.misc.getValue(carg_cca, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.misc.stackRestore(stacktop);
  return ret;
};

// from cephes/bessel/airy.c
function airy(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.bessel.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.bessel.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* ai
  const carg_ai = cephes.bessel.stackAlloc(8); // No need to zero-set it.

  // argument: double* aip
  const carg_aip = cephes.bessel.stackAlloc(8); // No need to zero-set it.

  // argument: double* bi
  const carg_bi = cephes.bessel.stackAlloc(8); // No need to zero-set it.

  // argument: double* bip
  const carg_bip = cephes.bessel.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes.cephes_airy(carg_x, carg_ai, carg_aip, carg_bi, carg_bip) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'ai': cephes.bessel.getValue(carg_ai, 'double'),
    'aip': cephes.bessel.getValue(carg_aip, 'double'),
    'bi': cephes.bessel.getValue(carg_bi, 'double'),
    'bip': cephes.bessel.getValue(carg_bip, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.bessel.stackRestore(stacktop);
  return ret;
};

// from cephes/bessel/j0.c
function j0(/* double */ x) {
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

// from cephes/bessel/j1.c
function j1(/* double */ x) {
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

// from cephes/bessel/jn.c
function jn(/* int */ n, /* double */ x) {
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

// from cephes/bessel/jv.c
function jv(/* double */ n, /* double */ x) {
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

// from cephes/bessel/j0.c
function y0(/* double */ x) {
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

// from cephes/bessel/j1.c
function y1(/* double */ x) {
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

// from cephes/bessel/yn.c
function yn(/* int */ n, /* double */ x) {
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

// from cephes/bessel/struve.c
function yv(/* double */ v, /* double */ x) {
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

// from cephes/bessel/i0.c
function i0(/* double */ x) {
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

// from cephes/bessel/i0.c
function i0e(/* double */ x) {
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

// from cephes/bessel/i1.c
function i1(/* double */ x) {
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

// from cephes/bessel/i1.c
function i1e(/* double */ x) {
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

// from cephes/bessel/iv.c
function iv(/* double */ v, /* double */ x) {
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

// from cephes/bessel/k0.c
function k0(/* double */ x) {
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

// from cephes/bessel/k0.c
function k0e(/* double */ x) {
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

// from cephes/bessel/k1.c
function k1(/* double */ x) {
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

// from cephes/bessel/k1.c
function k1e(/* double */ x) {
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

// from cephes/bessel/kn.c
function kn(/* int */ nn, /* double */ x) {
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

// from cephes/bessel/hyperg.c
function hyperg(/* double */ a, /* double */ b, /* double */ x) {
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

// from cephes/bessel/hyp2f1.c
function hyp2f1(/* double */ a, /* double */ b, /* double */ c, /* double */ x) {
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

// from cephes/ellf/ellpe.c
function ellpe(/* double */ x) {
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

// from cephes/ellf/ellie.c
function ellie(/* double */ phi, /* double */ m) {
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

// from cephes/ellf/ellpk.c
function ellpk(/* double */ x) {
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

// from cephes/ellf/ellik.c
function ellik(/* double */ phi, /* double */ m) {
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

// from cephes/ellf/ellpj.c
function ellpj(/* double */ u, /* double */ m) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.ellf.stackSave();

  // argument: double u
  if (typeof u !== 'number') {
    cephes.ellf.stackRestore(stacktop);
    throw new TypeError('u must be a number');
  }
  const carg_u = u;

  // argument: double m
  if (typeof m !== 'number') {
    cephes.ellf.stackRestore(stacktop);
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // argument: double* sn
  const carg_sn = cephes.ellf.stackAlloc(8); // No need to zero-set it.

  // argument: double* cn
  const carg_cn = cephes.ellf.stackAlloc(8); // No need to zero-set it.

  // argument: double* dn
  const carg_dn = cephes.ellf.stackAlloc(8); // No need to zero-set it.

  // argument: double* ph
  const carg_ph = cephes.ellf.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes.cephes_ellpj(carg_u, carg_m, carg_sn, carg_cn, carg_dn, carg_ph) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'sn': cephes.ellf.getValue(carg_sn, 'double'),
    'cn': cephes.ellf.getValue(carg_cn, 'double'),
    'dn': cephes.ellf.getValue(carg_dn, 'double'),
    'ph': cephes.ellf.getValue(carg_ph, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.ellf.stackRestore(stacktop);
  return ret;
};

// from cephes/cprob/btdtr.c
function btdtr(/* double */ a, /* double */ b, /* double */ x) {
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

// from cephes/cprob/kolmogorov.c
function smirnov(/* int */ n, /* double */ e) {
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

// from cephes/cprob/kolmogorov.c
function kolmogorov(/* double */ y) {
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

// from cephes/cprob/kolmogorov.c
function smirnovi(/* int */ n, /* double */ p) {
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

// from cephes/cprob/kolmogorov.c
function kolmogi(/* double */ p) {
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

// from cephes/cprob/nbdtr.c
function nbdtri(/* int */ k, /* int */ n, /* double */ p) {
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

// from cephes/cprob/stdtr.c
function stdtri(/* int */ k, /* double */ p) {
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

// from cephes/cprob/bdtr.c
function bdtr(/* int */ k, /* int */ n, /* double */ p) {
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

// from cephes/cprob/bdtr.c
function bdtrc(/* int */ k, /* int */ n, /* double */ p) {
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

// from cephes/cprob/bdtr.c
function bdtri(/* int */ k, /* int */ n, /* double */ y) {
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

// from cephes/cprob/chdtr.c
function chdtr(/* double */ df, /* double */ x) {
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

// from cephes/cprob/chdtr.c
function chdtrc(/* double */ df, /* double */ x) {
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

// from cephes/cprob/chdtr.c
function chdtri(/* double */ df, /* double */ y) {
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

// from cephes/cprob/fdtr.c
function fdtr(/* int */ ia, /* int */ ib, /* double */ x) {
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

// from cephes/cprob/fdtr.c
function fdtrc(/* int */ ia, /* int */ ib, /* double */ x) {
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

// from cephes/cprob/fdtr.c
function fdtri(/* int */ ia, /* int */ ib, /* double */ y) {
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

// from cephes/cprob/gdtr.c
function gdtr(/* double */ a, /* double */ b, /* double */ x) {
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

// from cephes/cprob/gdtr.c
function gdtrc(/* double */ a, /* double */ b, /* double */ x) {
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

// from cephes/cprob/nbdtr.c
function nbdtr(/* int */ k, /* int */ n, /* double */ p) {
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

// from cephes/cprob/nbdtr.c
function nbdtrc(/* int */ k, /* int */ n, /* double */ p) {
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

// from cephes/cprob/ndtr.c
function ndtr(/* double */ a) {
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

// from cephes/cprob/ndtri.c
function ndtri(/* double */ y0) {
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

// from cephes/cprob/pdtr.c
function pdtr(/* int */ k, /* double */ m) {
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

// from cephes/cprob/pdtr.c
function pdtrc(/* int */ k, /* double */ m) {
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

// from cephes/cprob/pdtr.c
function pdtri(/* int */ k, /* double */ y) {
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

// from cephes/cprob/stdtr.c
function stdtr(/* int */ k, /* double */ t) {
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

// from cephes/misc/planck.c
function plancki(/* double */ w, /* double */ T) {
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

// from cephes/misc/planck.c
function planckc(/* double */ w, /* double */ T) {
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

// from cephes/misc/planck.c
function planckd(/* double */ w, /* double */ T) {
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

// from cephes/misc/planck.c
function planckw(/* double */ T) {
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

// from cephes/misc/spence.c
function spence(/* double */ x) {
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

// from cephes/misc/zetac.c
function zetac(/* double */ x) {
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

// from cephes/misc/zeta.c
function zeta(/* double */ x, /* double */ q) {
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

// from cephes/bessel/struve.c
function struve(/* double */ v, /* double */ x) {
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

// from cephes/misc/simpsn.c
function simpsn(/* double[] */ f, /* double */ delta) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();

  // argument: double[] f
  if (!(f instanceof Float64Array)) {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('f must be either a Float64Array');
  }
  const carg_f = cephes.misc.stackAlloc(f.length << 3);
  cephes.misc.writeArrayToMemory(new Uint8Array(f.buffer, f.byteOffset, f.byteLength), carg_f);

  // argument: double delta
  if (typeof delta !== 'number') {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('delta must be a number');
  }
  const carg_delta = delta;

  // return: double
  const fn_ret = cephes.cephes_simpsn(carg_f, carg_delta);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  // Restore internal stacktop before returning
  cephes.misc.stackRestore(stacktop);
  return ret;
};

// from cephes/misc/polevl.c
function p1evl(/* double */ x, /* double[] */ coef, /* int */ N) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double[] coef
  if (!(coef instanceof Float64Array)) {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('coef must be either a Float64Array');
  }
  const carg_coef = cephes.misc.stackAlloc(coef.length << 3);
  cephes.misc.writeArrayToMemory(new Uint8Array(coef.buffer, coef.byteOffset, coef.byteLength), carg_coef);

  // argument: int N
  if (typeof N !== 'number') {
    cephes.misc.stackRestore(stacktop);
    throw new TypeError('N must be a number');
  }
  const carg_N = N | 0;

  // return: double
  const fn_ret = cephes.cephes_p1evl(carg_x, carg_coef, carg_N);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  // Restore internal stacktop before returning
  cephes.misc.stackRestore(stacktop);
  return ret;
};

// from cephes/misc/polylog.c
function polylog(/* int */ n, /* double */ x) {
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

module.exports = {compiled,signbit,isnan,isfinite,sqrt,cbrt,polevl,chbevl,round,ceil,floor,frexp,ldexp,fabs,expx2,radian,sincos,cot,cotdg,log1p,expm1,cosm1,acos,acosh,asinh,atanh,asin,atan,atan2,cos,cosdg,exp,exp2,exp10,cosh,sinh,tanh,log,log2,log10,pow,powi,sin,sindg,tan,tandg,ei,expn,shichi,sici,lbeta,beta,fac,gamma,lgam,incbet,incbi,igam,igamc,igami,psi,rgamma,erf,erfc,dawsn,fresnl,airy,j0,j1,jn,jv,y0,y1,yn,yv,i0,i0e,i1,i1e,iv,k0,k0e,k1,k1e,kn,hyperg,hyp2f1,ellpe,ellie,ellpk,ellik,ellpj,btdtr,smirnov,kolmogorov,smirnovi,kolmogi,nbdtri,stdtri,bdtr,bdtrc,bdtri,chdtr,chdtrc,chdtri,fdtr,fdtrc,fdtri,gdtr,gdtrc,nbdtr,nbdtrc,ndtr,ndtri,pdtr,pdtrc,pdtri,stdtr,plancki,planckc,planckd,planckw,spence,zetac,zeta,struve,simpsn,p1evl,polylog}