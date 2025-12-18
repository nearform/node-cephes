import cephes from "./cephes.js";
import { isComplex, type Complex, create as createComplex } from "./complex.js";

type Int = number;
// Export compiled promise, in Node.js this is just a dummy promise as the
// WebAssembly program will be compiled synchronously. It takes about 20ms
// as of Node.js v10.6.1.
export const compiled = cephes.compiled ?? Promise.resolve();
export { createComplex };
// from cephes/cmath/isnan.c
export function signbit(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: int
  const fn_ret = cephes.cephes_signbit(carg_x) | 0;

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/clog.c
export function csinh(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_csinh(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function casinh(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_casinh(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function ccosh(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_ccosh(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function cacosh(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_cacosh(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function ctanh(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_ctanh(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function catanh(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_catanh(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function cpow(a: Complex, z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex a
    if (!isComplex(a)) {
      throw new TypeError("a must be a Complex");
    }
    const carg_a = cephes.cmath.stackAlloc(16);
    const aBuffer = new Float64Array([a.real, a.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(aBuffer.buffer, aBuffer.byteOffset, aBuffer.byteLength),
      carg_a,
    );

    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_cpow(carg_a, carg_z, carg_w);

    [a.real, a.imag] = cephes.cmath.getValue(carg_a, "Complex");
    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/ellf/cmplx.c
export function cneg(a: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.ellf.stackSave();
  try {
    // argument: Complex a
    if (!isComplex(a)) {
      throw new TypeError("a must be a Complex");
    }
    const carg_a = cephes.ellf.stackAlloc(16);
    const aBuffer = new Float64Array([a.real, a.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(aBuffer.buffer, aBuffer.byteOffset, aBuffer.byteLength),
      carg_a,
    );

    // return: void
    cephes.cephes_cneg(carg_a);

    [a.real, a.imag] = cephes.ellf.getValue(carg_a, "Complex");

    return a;
  } finally {
    // Restore internal stacktop before returning
    cephes.ellf.stackRestore(stacktop);
  }
}

// from cephes/cmath/isnan.c
export function isnan(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: int
  const fn_ret = cephes.cephes_isnan(carg_x) | 0;

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/isnan.c
export function isfinite(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: int
  const fn_ret = cephes.cephes_isfinite(carg_x) | 0;

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/sqrt.c
export function sqrt(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_sqrt(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/cbrt.c
export function cbrt(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cbrt(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/polevl.c
export function polevl(x: number, coef: Float64Array, N: Int) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();
  try {
    // argument: double x
    if (typeof x !== "number") {
      throw new TypeError("x must be a number");
    }
    const carg_x = x;

    // argument: double[] coef
    if (!(coef instanceof Float64Array)) {
      throw new TypeError("coef must be either a Float64Array");
    }
    const carg_coef = cephes.misc.stackAlloc(coef.length << 3);
    cephes.misc.writeArrayToMemory(
      new Uint8Array(coef.buffer, coef.byteOffset, coef.byteLength),
      carg_coef,
    );

    // argument: int N
    if (typeof N !== "number") {
      throw new TypeError("N must be a number");
    }
    const carg_N = N | 0;

    // return: double
    const fn_ret = cephes.cephes_polevl(carg_x, carg_coef, carg_N);

    // No pointers, so just return fn_ret
    const ret = fn_ret;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.misc.stackRestore(stacktop);
  }
}

// from cephes/misc/chbevl.c
export function chbevl(x: number, array: Float64Array, n: Int) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();
  try {
    // argument: double x
    if (typeof x !== "number") {
      throw new TypeError("x must be a number");
    }
    const carg_x = x;

    // argument: double[] array
    if (!(array instanceof Float64Array)) {
      throw new TypeError("array must be either a Float64Array");
    }
    const carg_array = cephes.misc.stackAlloc(array.length << 3);
    cephes.misc.writeArrayToMemory(
      new Uint8Array(array.buffer, array.byteOffset, array.byteLength),
      carg_array,
    );

    // argument: int n
    if (typeof n !== "number") {
      throw new TypeError("n must be a number");
    }
    const carg_n = n | 0;

    // return: double
    const fn_ret = cephes.cephes_chbevl(carg_x, carg_array, carg_n);

    // No pointers, so just return fn_ret
    const ret = fn_ret;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.misc.stackRestore(stacktop);
  }
}

// from cephes/cmath/round.c
export function round(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_round(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/floor.c
export function ceil(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_ceil(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/floor.c
export function floor(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_floor(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/floor.c
export function frexp(x: number) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: double x
    if (typeof x !== "number") {
      throw new TypeError("x must be a number");
    }
    const carg_x = x;

    // argument: int* pw2
    const carg_pw2 = cephes.cmath.stackAlloc(4); // No need to zero-set it.

    // return: double
    const fn_ret = cephes.cephes_frexp(carg_x, carg_pw2);

    // There are pointers, so return the values of thoese too
    const ret = [
      fn_ret,
      {
        pw2: cephes.cmath.getValue(carg_pw2, "i32"),
      },
    ] as const;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/floor.c
export function ldexp(x: number, pw2: Int) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // argument: int pw2
  if (typeof pw2 !== "number") {
    throw new TypeError("pw2 must be a number");
  }
  const carg_pw2 = pw2 | 0;

  // return: double
  const fn_ret = cephes.cephes_ldexp(carg_x, carg_pw2);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/fabs.c
export function fabs(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_fabs(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/expx2.c
export function expx2(x: number, sign: Int) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // argument: int sign
  if (typeof sign !== "number") {
    throw new TypeError("sign must be a number");
  }
  const carg_sign = sign | 0;

  // return: double
  const fn_ret = cephes.cephes_expx2(carg_x, carg_sign);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/sin.c
export function radian(d: number, m: number, s: number) {
  // argument: double d
  if (typeof d !== "number") {
    throw new TypeError("d must be a number");
  }
  const carg_d = d;

  // argument: double m
  if (typeof m !== "number") {
    throw new TypeError("m must be a number");
  }
  const carg_m = m;

  // argument: double s
  if (typeof s !== "number") {
    throw new TypeError("s must be a number");
  }
  const carg_s = s;

  // return: double
  const fn_ret = cephes.cephes_radian(carg_d, carg_m, carg_s);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/sincos.c
export function sincos(x: number, flg: Int) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: double x
    if (typeof x !== "number") {
      throw new TypeError("x must be a number");
    }
    const carg_x = x;

    // argument: double* s
    const carg_s = cephes.cmath.stackAlloc(8); // No need to zero-set it.

    // argument: double* c
    const carg_c = cephes.cmath.stackAlloc(8); // No need to zero-set it.

    // argument: int flg
    if (typeof flg !== "number") {
      throw new TypeError("flg must be a number");
    }
    const carg_flg = flg | 0;

    // return: int
    const fn_ret = cephes.cephes_sincos(carg_x, carg_s, carg_c, carg_flg) | 0;

    // There are pointers, so return the values of thoese too
    const ret = [
      fn_ret,
      {
        s: cephes.cmath.getValue(carg_s, "double"),
        c: cephes.cmath.getValue(carg_c, "double"),
      },
    ] as const;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/tan.c
export function cot(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cot(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/tandg.c
export function cotdg(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cotdg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/unity.c
export function log1p(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_log1p(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/unity.c
export function expm1(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_expm1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/unity.c
export function cosm1(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cosm1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/asin.c
export function acos(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_acos(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/acosh.c
export function acosh(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_acosh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/asinh.c
export function asinh(xx: number) {
  // argument: double xx
  if (typeof xx !== "number") {
    throw new TypeError("xx must be a number");
  }
  const carg_xx = xx;

  // return: double
  const fn_ret = cephes.cephes_asinh(carg_xx);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/atanh.c
export function atanh(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_atanh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/asin.c
export function asin(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_asin(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/atan.c
export function atan(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_atan(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/atan.c
export function atan2(y: number, x: number) {
  // argument: double y
  if (typeof y !== "number") {
    throw new TypeError("y must be a number");
  }
  const carg_y = y;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_atan2(carg_y, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/sin.c
export function cos(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cos(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/sindg.c
export function cosdg(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cosdg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/exp.c
export function exp(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_exp(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/exp2.c
export function exp2(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_exp2(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/exp10.c
export function exp10(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_exp10(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/cosh.c
export function cosh(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_cosh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/sinh.c
export function sinh(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_sinh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/tanh.c
export function tanh(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_tanh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/log.c
export function log(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_log(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/log2.c
export function log2(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_log2(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/log10.c
export function log10(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_log10(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/pow.c
export function pow(x: number, y: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // argument: double y
  if (typeof y !== "number") {
    throw new TypeError("y must be a number");
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_pow(carg_x, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/powi.c
export function powi(x: number, nn: Int) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // argument: int nn
  if (typeof nn !== "number") {
    throw new TypeError("nn must be a number");
  }
  const carg_nn = nn | 0;

  // return: double
  const fn_ret = cephes.cephes_powi(carg_x, carg_nn);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/sin.c
export function sin(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_sin(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/sindg.c
export function sindg(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_sindg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/tan.c
export function tan(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_tan(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cmath/tandg.c
export function tandg(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_tandg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/ei.c
export function ei(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_ei(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/expn.c
export function expn(n: Int, x: number) {
  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_expn(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/shichi.c
export function shichi(x: number) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();
  try {
    // argument: double x
    if (typeof x !== "number") {
      throw new TypeError("x must be a number");
    }
    const carg_x = x;

    // argument: double* si
    const carg_si = cephes.misc.stackAlloc(8); // No need to zero-set it.

    // argument: double* ci
    const carg_ci = cephes.misc.stackAlloc(8); // No need to zero-set it.

    // return: int
    const fn_ret = cephes.cephes_shichi(carg_x, carg_si, carg_ci) | 0;

    // There are pointers, so return the values of thoese too
    const ret = [
      fn_ret,
      {
        si: cephes.misc.getValue(carg_si, "double"),
        ci: cephes.misc.getValue(carg_ci, "double"),
      },
    ] as const;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.misc.stackRestore(stacktop);
  }
}

// from cephes/misc/sici.c
export function sici(x: number) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();
  try {
    // argument: double x
    if (typeof x !== "number") {
      throw new TypeError("x must be a number");
    }
    const carg_x = x;

    // argument: double* si
    const carg_si = cephes.misc.stackAlloc(8); // No need to zero-set it.

    // argument: double* ci
    const carg_ci = cephes.misc.stackAlloc(8); // No need to zero-set it.

    // return: int
    const fn_ret = cephes.cephes_sici(carg_x, carg_si, carg_ci) | 0;

    // There are pointers, so return the values of thoese too
    const ret = [
      fn_ret,
      {
        si: cephes.misc.getValue(carg_si, "double"),
        ci: cephes.misc.getValue(carg_ci, "double"),
      },
    ] as const;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.misc.stackRestore(stacktop);
  }
}

// from cephes/misc/beta.c
export function lbeta(a: number, b: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== "number") {
    throw new TypeError("b must be a number");
  }
  const carg_b = b;

  // return: double
  const fn_ret = cephes.cephes_lbeta(carg_a, carg_b);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/beta.c
export function beta(a: number, b: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== "number") {
    throw new TypeError("b must be a number");
  }
  const carg_b = b;

  // return: double
  const fn_ret = cephes.cephes_beta(carg_a, carg_b);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/fac.c
export function fac(i: Int) {
  // argument: int i
  if (typeof i !== "number") {
    throw new TypeError("i must be a number");
  }
  const carg_i = i | 0;

  // return: double
  const fn_ret = cephes.cephes_fac(carg_i);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/gamma.c
export function gamma(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_gamma(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/gamma.c
export function lgam(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_lgam(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/incbet.c
export function incbet(aa: number, bb: number, xx: number) {
  // argument: double aa
  if (typeof aa !== "number") {
    throw new TypeError("aa must be a number");
  }
  const carg_aa = aa;

  // argument: double bb
  if (typeof bb !== "number") {
    throw new TypeError("bb must be a number");
  }
  const carg_bb = bb;

  // argument: double xx
  if (typeof xx !== "number") {
    throw new TypeError("xx must be a number");
  }
  const carg_xx = xx;

  // return: double
  const fn_ret = cephes.cephes_incbet(carg_aa, carg_bb, carg_xx);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/incbi.c
export function incbi(aa: number, bb: number, yy0: number) {
  // argument: double aa
  if (typeof aa !== "number") {
    throw new TypeError("aa must be a number");
  }
  const carg_aa = aa;

  // argument: double bb
  if (typeof bb !== "number") {
    throw new TypeError("bb must be a number");
  }
  const carg_bb = bb;

  // argument: double yy0
  if (typeof yy0 !== "number") {
    throw new TypeError("yy0 must be a number");
  }
  const carg_yy0 = yy0;

  // return: double
  const fn_ret = cephes.cephes_incbi(carg_aa, carg_bb, carg_yy0);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/igam.c
export function igam(a: number, x: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_igam(carg_a, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/igam.c
export function igamc(a: number, x: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_igamc(carg_a, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/igami.c
export function igami(a: number, y0: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // argument: double y0
  if (typeof y0 !== "number") {
    throw new TypeError("y0 must be a number");
  }
  const carg_y0 = y0;

  // return: double
  const fn_ret = cephes.cephes_igami(carg_a, carg_y0);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/psi.c
export function psi(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_psi(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/rgamma.c
export function rgamma(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_rgamma(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/ndtr.c
export function erf(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_erf(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/ndtr.c
export function erfc(a: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // return: double
  const fn_ret = cephes.cephes_erfc(carg_a);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/dawsn.c
export function dawsn(xx: number) {
  // argument: double xx
  if (typeof xx !== "number") {
    throw new TypeError("xx must be a number");
  }
  const carg_xx = xx;

  // return: double
  const fn_ret = cephes.cephes_dawsn(carg_xx);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/fresnl.c
export function fresnl(xxa: number) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();
  try {
    // argument: double xxa
    if (typeof xxa !== "number") {
      throw new TypeError("xxa must be a number");
    }
    const carg_xxa = xxa;

    // argument: double* ssa
    const carg_ssa = cephes.misc.stackAlloc(8); // No need to zero-set it.

    // argument: double* cca
    const carg_cca = cephes.misc.stackAlloc(8); // No need to zero-set it.

    // return: int
    const fn_ret = cephes.cephes_fresnl(carg_xxa, carg_ssa, carg_cca) | 0;

    // There are pointers, so return the values of thoese too
    const ret = [
      fn_ret,
      {
        ssa: cephes.misc.getValue(carg_ssa, "double"),
        cca: cephes.misc.getValue(carg_cca, "double"),
      },
    ] as const;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.misc.stackRestore(stacktop);
  }
}

// from cephes/bessel/airy.c
export function airy(x: number) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.bessel.stackSave();
  try {
    // argument: double x
    if (typeof x !== "number") {
      throw new TypeError("x must be a number");
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
    const fn_ret =
      cephes.cephes_airy(carg_x, carg_ai, carg_aip, carg_bi, carg_bip) | 0;

    // There are pointers, so return the values of thoese too
    const ret = [
      fn_ret,
      {
        ai: cephes.bessel.getValue(carg_ai, "double"),
        aip: cephes.bessel.getValue(carg_aip, "double"),
        bi: cephes.bessel.getValue(carg_bi, "double"),
        bip: cephes.bessel.getValue(carg_bip, "double"),
      },
    ] as const;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.bessel.stackRestore(stacktop);
  }
}

// from cephes/bessel/j0.c
export function j0(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_j0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/j1.c
export function j1(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_j1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/jn.c
export function jn(n: Int, x: number) {
  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_jn(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/jv.c
export function jv(n: number, x: number) {
  // argument: double n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_jv(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/j0.c
export function y0(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_y0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/j1.c
export function y1(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_y1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/yn.c
export function yn(n: Int, x: number) {
  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_yn(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/struve.c
export function yv(v: number, x: number) {
  // argument: double v
  if (typeof v !== "number") {
    throw new TypeError("v must be a number");
  }
  const carg_v = v;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_yv(carg_v, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/i0.c
export function i0(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_i0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/i0.c
export function i0e(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_i0e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/i1.c
export function i1(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_i1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/i1.c
export function i1e(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_i1e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/iv.c
export function iv(v: number, x: number) {
  // argument: double v
  if (typeof v !== "number") {
    throw new TypeError("v must be a number");
  }
  const carg_v = v;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_iv(carg_v, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/k0.c
export function k0(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_k0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/k0.c
export function k0e(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_k0e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/k1.c
export function k1(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_k1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/k1.c
export function k1e(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_k1e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/kn.c
export function kn(nn: Int, x: number) {
  // argument: int nn
  if (typeof nn !== "number") {
    throw new TypeError("nn must be a number");
  }
  const carg_nn = nn | 0;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_kn(carg_nn, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/hyperg.c
export function hyperg(a: number, b: number, x: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== "number") {
    throw new TypeError("b must be a number");
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_hyperg(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/hyp2f1.c
export function hyp2f1(a: number, b: number, c: number, x: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== "number") {
    throw new TypeError("b must be a number");
  }
  const carg_b = b;

  // argument: double c
  if (typeof c !== "number") {
    throw new TypeError("c must be a number");
  }
  const carg_c = c;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_hyp2f1(carg_a, carg_b, carg_c, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/ellf/ellpe.c
export function ellpe(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_ellpe(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/ellf/ellie.c
export function ellie(phi: number, m: number) {
  // argument: double phi
  if (typeof phi !== "number") {
    throw new TypeError("phi must be a number");
  }
  const carg_phi = phi;

  // argument: double m
  if (typeof m !== "number") {
    throw new TypeError("m must be a number");
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes.cephes_ellie(carg_phi, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/ellf/ellpk.c
export function ellpk(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_ellpk(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/ellf/ellik.c
export function ellik(phi: number, m: number) {
  // argument: double phi
  if (typeof phi !== "number") {
    throw new TypeError("phi must be a number");
  }
  const carg_phi = phi;

  // argument: double m
  if (typeof m !== "number") {
    throw new TypeError("m must be a number");
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes.cephes_ellik(carg_phi, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/ellf/ellpj.c
export function ellpj(u: number, m: number) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.ellf.stackSave();
  try {
    // argument: double u
    if (typeof u !== "number") {
      throw new TypeError("u must be a number");
    }
    const carg_u = u;

    // argument: double m
    if (typeof m !== "number") {
      throw new TypeError("m must be a number");
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
    const fn_ret =
      cephes.cephes_ellpj(carg_u, carg_m, carg_sn, carg_cn, carg_dn, carg_ph) |
      0;

    // There are pointers, so return the values of thoese too
    const ret = [
      fn_ret,
      {
        sn: cephes.ellf.getValue(carg_sn, "double"),
        cn: cephes.ellf.getValue(carg_cn, "double"),
        dn: cephes.ellf.getValue(carg_dn, "double"),
        ph: cephes.ellf.getValue(carg_ph, "double"),
      },
    ] as const;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.ellf.stackRestore(stacktop);
  }
}

// from cephes/cprob/btdtr.c
export function btdtr(a: number, b: number, x: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== "number") {
    throw new TypeError("b must be a number");
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_btdtr(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/kolmogorov.c
export function smirnov(n: Int, e: number) {
  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double e
  if (typeof e !== "number") {
    throw new TypeError("e must be a number");
  }
  const carg_e = e;

  // return: double
  const fn_ret = cephes.cephes_smirnov(carg_n, carg_e);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/kolmogorov.c
export function kolmogorov(y: number) {
  // argument: double y
  if (typeof y !== "number") {
    throw new TypeError("y must be a number");
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_kolmogorov(carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/kolmogorov.c
export function smirnovi(n: Int, p: number) {
  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== "number") {
    throw new TypeError("p must be a number");
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_smirnovi(carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/kolmogorov.c
export function kolmogi(p: number) {
  // argument: double p
  if (typeof p !== "number") {
    throw new TypeError("p must be a number");
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_kolmogi(carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/nbdtr.c
export function nbdtri(k: Int, n: Int, p: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== "number") {
    throw new TypeError("p must be a number");
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_nbdtri(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/stdtr.c
export function stdtri(k: Int, p: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: double p
  if (typeof p !== "number") {
    throw new TypeError("p must be a number");
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_stdtri(carg_k, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/bdtr.c
export function bdtr(k: Int, n: Int, p: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== "number") {
    throw new TypeError("p must be a number");
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_bdtr(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/bdtr.c
export function bdtrc(k: Int, n: Int, p: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== "number") {
    throw new TypeError("p must be a number");
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_bdtrc(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/bdtr.c
export function bdtri(k: Int, n: Int, y: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double y
  if (typeof y !== "number") {
    throw new TypeError("y must be a number");
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_bdtri(carg_k, carg_n, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/chdtr.c
export function chdtr(df: number, x: number) {
  // argument: double df
  if (typeof df !== "number") {
    throw new TypeError("df must be a number");
  }
  const carg_df = df;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_chdtr(carg_df, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/chdtr.c
export function chdtrc(df: number, x: number) {
  // argument: double df
  if (typeof df !== "number") {
    throw new TypeError("df must be a number");
  }
  const carg_df = df;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_chdtrc(carg_df, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/chdtr.c
export function chdtri(df: number, y: number) {
  // argument: double df
  if (typeof df !== "number") {
    throw new TypeError("df must be a number");
  }
  const carg_df = df;

  // argument: double y
  if (typeof y !== "number") {
    throw new TypeError("y must be a number");
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_chdtri(carg_df, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/fdtr.c
export function fdtr(ia: Int, ib: Int, x: number) {
  // argument: int ia
  if (typeof ia !== "number") {
    throw new TypeError("ia must be a number");
  }
  const carg_ia = ia | 0;

  // argument: int ib
  if (typeof ib !== "number") {
    throw new TypeError("ib must be a number");
  }
  const carg_ib = ib | 0;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_fdtr(carg_ia, carg_ib, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/fdtr.c
export function fdtrc(ia: Int, ib: Int, x: number) {
  // argument: int ia
  if (typeof ia !== "number") {
    throw new TypeError("ia must be a number");
  }
  const carg_ia = ia | 0;

  // argument: int ib
  if (typeof ib !== "number") {
    throw new TypeError("ib must be a number");
  }
  const carg_ib = ib | 0;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_fdtrc(carg_ia, carg_ib, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/fdtr.c
export function fdtri(ia: Int, ib: Int, y: number) {
  // argument: int ia
  if (typeof ia !== "number") {
    throw new TypeError("ia must be a number");
  }
  const carg_ia = ia | 0;

  // argument: int ib
  if (typeof ib !== "number") {
    throw new TypeError("ib must be a number");
  }
  const carg_ib = ib | 0;

  // argument: double y
  if (typeof y !== "number") {
    throw new TypeError("y must be a number");
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_fdtri(carg_ia, carg_ib, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/gdtr.c
export function gdtr(a: number, b: number, x: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== "number") {
    throw new TypeError("b must be a number");
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_gdtr(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/gdtr.c
export function gdtrc(a: number, b: number, x: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== "number") {
    throw new TypeError("b must be a number");
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_gdtrc(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/nbdtr.c
export function nbdtr(k: Int, n: Int, p: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== "number") {
    throw new TypeError("p must be a number");
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_nbdtr(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/nbdtr.c
export function nbdtrc(k: Int, n: Int, p: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== "number") {
    throw new TypeError("p must be a number");
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes.cephes_nbdtrc(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/ndtr.c
export function ndtr(a: number) {
  // argument: double a
  if (typeof a !== "number") {
    throw new TypeError("a must be a number");
  }
  const carg_a = a;

  // return: double
  const fn_ret = cephes.cephes_ndtr(carg_a);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/ndtri.c
export function ndtri(y0: number) {
  // argument: double y0
  if (typeof y0 !== "number") {
    throw new TypeError("y0 must be a number");
  }
  const carg_y0 = y0;

  // return: double
  const fn_ret = cephes.cephes_ndtri(carg_y0);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/pdtr.c
export function pdtr(k: Int, m: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: double m
  if (typeof m !== "number") {
    throw new TypeError("m must be a number");
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes.cephes_pdtr(carg_k, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/pdtr.c
export function pdtrc(k: Int, m: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: double m
  if (typeof m !== "number") {
    throw new TypeError("m must be a number");
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes.cephes_pdtrc(carg_k, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/pdtr.c
export function pdtri(k: Int, y: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: double y
  if (typeof y !== "number") {
    throw new TypeError("y must be a number");
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes.cephes_pdtri(carg_k, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/cprob/stdtr.c
export function stdtr(k: Int, t: number) {
  // argument: int k
  if (typeof k !== "number") {
    throw new TypeError("k must be a number");
  }
  const carg_k = k | 0;

  // argument: double t
  if (typeof t !== "number") {
    throw new TypeError("t must be a number");
  }
  const carg_t = t;

  // return: double
  const fn_ret = cephes.cephes_stdtr(carg_k, carg_t);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/planck.c
export function plancki(w: number, T: number) {
  // argument: double w
  if (typeof w !== "number") {
    throw new TypeError("w must be a number");
  }
  const carg_w = w;

  // argument: double T
  if (typeof T !== "number") {
    throw new TypeError("T must be a number");
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes.cephes_plancki(carg_w, carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/planck.c
export function planckc(w: number, T: number) {
  // argument: double w
  if (typeof w !== "number") {
    throw new TypeError("w must be a number");
  }
  const carg_w = w;

  // argument: double T
  if (typeof T !== "number") {
    throw new TypeError("T must be a number");
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes.cephes_planckc(carg_w, carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/planck.c
export function planckd(w: number, T: number) {
  // argument: double w
  if (typeof w !== "number") {
    throw new TypeError("w must be a number");
  }
  const carg_w = w;

  // argument: double T
  if (typeof T !== "number") {
    throw new TypeError("T must be a number");
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes.cephes_planckd(carg_w, carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/planck.c
export function planckw(T: number) {
  // argument: double T
  if (typeof T !== "number") {
    throw new TypeError("T must be a number");
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes.cephes_planckw(carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/spence.c
export function spence(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_spence(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/zetac.c
export function zetac(x: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_zetac(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/zeta.c
export function zeta(x: number, q: number) {
  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // argument: double q
  if (typeof q !== "number") {
    throw new TypeError("q must be a number");
  }
  const carg_q = q;

  // return: double
  const fn_ret = cephes.cephes_zeta(carg_x, carg_q);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/bessel/struve.c
export function struve(v: number, x: number) {
  // argument: double v
  if (typeof v !== "number") {
    throw new TypeError("v must be a number");
  }
  const carg_v = v;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_struve(carg_v, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

// from cephes/misc/simpsn.c
export function simpsn(f: Float64Array, delta: number) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();
  try {
    // argument: double[] f
    if (!(f instanceof Float64Array)) {
      throw new TypeError("f must be either a Float64Array");
    }
    const carg_f = cephes.misc.stackAlloc(f.length << 3);
    cephes.misc.writeArrayToMemory(
      new Uint8Array(f.buffer, f.byteOffset, f.byteLength),
      carg_f,
    );

    // argument: double delta
    if (typeof delta !== "number") {
      throw new TypeError("delta must be a number");
    }
    const carg_delta = delta;

    // return: double
    const fn_ret = cephes.cephes_simpsn(carg_f, carg_delta);

    // No pointers, so just return fn_ret
    const ret = fn_ret;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.misc.stackRestore(stacktop);
  }
}

// from cephes/ellf/cmplx.c
export function cadd(a: Complex, b: Complex, c: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.ellf.stackSave();
  try {
    // argument: Complex a
    if (!isComplex(a)) {
      throw new TypeError("a must be a Complex");
    }
    const carg_a = cephes.ellf.stackAlloc(16);
    const aBuffer = new Float64Array([a.real, a.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(aBuffer.buffer, aBuffer.byteOffset, aBuffer.byteLength),
      carg_a,
    );

    // argument: Complex b
    if (!isComplex(b)) {
      throw new TypeError("b must be a Complex");
    }
    const carg_b = cephes.ellf.stackAlloc(16);
    const bBuffer = new Float64Array([b.real, b.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(bBuffer.buffer, bBuffer.byteOffset, bBuffer.byteLength),
      carg_b,
    );

    // argument: Complex c
    if (!isComplex(c)) {
      throw new TypeError("c must be a Complex");
    }
    const carg_c = cephes.ellf.stackAlloc(16);
    const cBuffer = new Float64Array([c.real, c.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(cBuffer.buffer, cBuffer.byteOffset, cBuffer.byteLength),
      carg_c,
    );

    // return: void
    cephes.cephes_cadd(carg_a, carg_b, carg_c);

    [a.real, a.imag] = cephes.ellf.getValue(carg_a, "Complex");
    [b.real, b.imag] = cephes.ellf.getValue(carg_b, "Complex");
    [c.real, c.imag] = cephes.ellf.getValue(carg_c, "Complex");

    return c;
  } finally {
    // Restore internal stacktop before returning
    cephes.ellf.stackRestore(stacktop);
  }
}

// from cephes/ellf/cmplx.c
export function csub(a: Complex, b: Complex, c: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.ellf.stackSave();
  try {
    // argument: Complex a
    if (!isComplex(a)) {
      throw new TypeError("a must be a Complex");
    }
    const carg_a = cephes.ellf.stackAlloc(16);
    const aBuffer = new Float64Array([a.real, a.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(aBuffer.buffer, aBuffer.byteOffset, aBuffer.byteLength),
      carg_a,
    );

    // argument: Complex b
    if (!isComplex(b)) {
      throw new TypeError("b must be a Complex");
    }
    const carg_b = cephes.ellf.stackAlloc(16);
    const bBuffer = new Float64Array([b.real, b.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(bBuffer.buffer, bBuffer.byteOffset, bBuffer.byteLength),
      carg_b,
    );

    // argument: Complex c
    if (!isComplex(c)) {
      throw new TypeError("c must be a Complex");
    }
    const carg_c = cephes.ellf.stackAlloc(16);
    const cBuffer = new Float64Array([c.real, c.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(cBuffer.buffer, cBuffer.byteOffset, cBuffer.byteLength),
      carg_c,
    );

    // return: void
    cephes.cephes_csub(carg_a, carg_b, carg_c);

    [a.real, a.imag] = cephes.ellf.getValue(carg_a, "Complex");
    [b.real, b.imag] = cephes.ellf.getValue(carg_b, "Complex");
    [c.real, c.imag] = cephes.ellf.getValue(carg_c, "Complex");

    return c;
  } finally {
    // Restore internal stacktop before returning
    cephes.ellf.stackRestore(stacktop);
  }
}

// from cephes/ellf/cmplx.c
export function cmul(a: Complex, b: Complex, c: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.ellf.stackSave();
  try {
    // argument: Complex a
    if (!isComplex(a)) {
      throw new TypeError("a must be a Complex");
    }
    const carg_a = cephes.ellf.stackAlloc(16);
    const aBuffer = new Float64Array([a.real, a.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(aBuffer.buffer, aBuffer.byteOffset, aBuffer.byteLength),
      carg_a,
    );

    // argument: Complex b
    if (!isComplex(b)) {
      throw new TypeError("b must be a Complex");
    }
    const carg_b = cephes.ellf.stackAlloc(16);
    const bBuffer = new Float64Array([b.real, b.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(bBuffer.buffer, bBuffer.byteOffset, bBuffer.byteLength),
      carg_b,
    );

    // argument: Complex c
    if (!isComplex(c)) {
      throw new TypeError("c must be a Complex");
    }
    const carg_c = cephes.ellf.stackAlloc(16);
    const cBuffer = new Float64Array([c.real, c.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(cBuffer.buffer, cBuffer.byteOffset, cBuffer.byteLength),
      carg_c,
    );

    // return: void
    cephes.cephes_cmul(carg_a, carg_b, carg_c);

    [a.real, a.imag] = cephes.ellf.getValue(carg_a, "Complex");
    [b.real, b.imag] = cephes.ellf.getValue(carg_b, "Complex");
    [c.real, c.imag] = cephes.ellf.getValue(carg_c, "Complex");

    return c;
  } finally {
    // Restore internal stacktop before returning
    cephes.ellf.stackRestore(stacktop);
  }
}

// from cephes/ellf/cmplx.c
export function cdiv(a: Complex, b: Complex, c: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.ellf.stackSave();
  try {
    // argument: Complex a
    if (!isComplex(a)) {
      throw new TypeError("a must be a Complex");
    }
    const carg_a = cephes.ellf.stackAlloc(16);
    const aBuffer = new Float64Array([a.real, a.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(aBuffer.buffer, aBuffer.byteOffset, aBuffer.byteLength),
      carg_a,
    );

    // argument: Complex b
    if (!isComplex(b)) {
      throw new TypeError("b must be a Complex");
    }
    const carg_b = cephes.ellf.stackAlloc(16);
    const bBuffer = new Float64Array([b.real, b.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(bBuffer.buffer, bBuffer.byteOffset, bBuffer.byteLength),
      carg_b,
    );

    // argument: Complex c
    if (!isComplex(c)) {
      throw new TypeError("c must be a Complex");
    }
    const carg_c = cephes.ellf.stackAlloc(16);
    const cBuffer = new Float64Array([c.real, c.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(cBuffer.buffer, cBuffer.byteOffset, cBuffer.byteLength),
      carg_c,
    );

    // return: void
    cephes.cephes_cdiv(carg_a, carg_b, carg_c);

    [a.real, a.imag] = cephes.ellf.getValue(carg_a, "Complex");
    [b.real, b.imag] = cephes.ellf.getValue(carg_b, "Complex");
    [c.real, c.imag] = cephes.ellf.getValue(carg_c, "Complex");

    return c;
  } finally {
    // Restore internal stacktop before returning
    cephes.ellf.stackRestore(stacktop);
  }
}

// from cephes/ellf/cmplx.c
export function csqrt(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.ellf.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.ellf.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.ellf.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.ellf.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_csqrt(carg_z, carg_w);

    [z.real, z.imag] = cephes.ellf.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.ellf.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.ellf.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function cexp(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_cexp(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function clog(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_clog(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function ccos(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_ccos(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function cacos(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_cacos(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function csin(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_csin(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function casin(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_casin(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function ctan(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_ctan(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function catan(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_catan(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/cmath/clog.c
export function ccot(z: Complex, w: Complex) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.cmath.stackSave();
  try {
    // argument: Complex z
    if (!isComplex(z)) {
      throw new TypeError("z must be a Complex");
    }
    const carg_z = cephes.cmath.stackAlloc(16);
    const zBuffer = new Float64Array([z.real, z.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(zBuffer.buffer, zBuffer.byteOffset, zBuffer.byteLength),
      carg_z,
    );

    // argument: Complex w
    if (!isComplex(w)) {
      throw new TypeError("w must be a Complex");
    }
    const carg_w = cephes.cmath.stackAlloc(16);
    const wBuffer = new Float64Array([w.real, w.imag]);
    cephes.cmath.writeArrayToMemory(
      new Uint8Array(wBuffer.buffer, wBuffer.byteOffset, wBuffer.byteLength),
      carg_w,
    );

    // return: void
    cephes.cephes_ccot(carg_z, carg_w);

    [z.real, z.imag] = cephes.cmath.getValue(carg_z, "Complex");
    [w.real, w.imag] = cephes.cmath.getValue(carg_w, "Complex");

    return w;
  } finally {
    // Restore internal stacktop before returning
    cephes.cmath.stackRestore(stacktop);
  }
}

// from cephes/misc/polevl.c
export function p1evl(x: number, coef: Float64Array, N: Int) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.misc.stackSave();
  try {
    // argument: double x
    if (typeof x !== "number") {
      throw new TypeError("x must be a number");
    }
    const carg_x = x;

    // argument: double[] coef
    if (!(coef instanceof Float64Array)) {
      throw new TypeError("coef must be either a Float64Array");
    }
    const carg_coef = cephes.misc.stackAlloc(coef.length << 3);
    cephes.misc.writeArrayToMemory(
      new Uint8Array(coef.buffer, coef.byteOffset, coef.byteLength),
      carg_coef,
    );

    // argument: int N
    if (typeof N !== "number") {
      throw new TypeError("N must be a number");
    }
    const carg_N = N | 0;

    // return: double
    const fn_ret = cephes.cephes_p1evl(carg_x, carg_coef, carg_N);

    // No pointers, so just return fn_ret
    const ret = fn_ret;

    return ret;
  } finally {
    // Restore internal stacktop before returning
    cephes.misc.stackRestore(stacktop);
  }
}

// from cephes/misc/polylog.c
export function polylog(n: Int, x: number) {
  // argument: int n
  if (typeof n !== "number") {
    throw new TypeError("n must be a number");
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== "number") {
    throw new TypeError("x must be a number");
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes.cephes_polylog(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
}

export default {
  compiled,
  createComplex,
  signbit,
  csinh,
  casinh,
  ccosh,
  cacosh,
  ctanh,
  catanh,
  cpow,
  cneg,
  isnan,
  isfinite,
  sqrt,
  cbrt,
  polevl,
  chbevl,
  round,
  ceil,
  floor,
  frexp,
  ldexp,
  fabs,
  expx2,
  radian,
  sincos,
  cot,
  cotdg,
  log1p,
  expm1,
  cosm1,
  acos,
  acosh,
  asinh,
  atanh,
  asin,
  atan,
  atan2,
  cos,
  cosdg,
  exp,
  exp2,
  exp10,
  cosh,
  sinh,
  tanh,
  log,
  log2,
  log10,
  pow,
  powi,
  sin,
  sindg,
  tan,
  tandg,
  ei,
  expn,
  shichi,
  sici,
  lbeta,
  beta,
  fac,
  gamma,
  lgam,
  incbet,
  incbi,
  igam,
  igamc,
  igami,
  psi,
  rgamma,
  erf,
  erfc,
  dawsn,
  fresnl,
  airy,
  j0,
  j1,
  jn,
  jv,
  y0,
  y1,
  yn,
  yv,
  i0,
  i0e,
  i1,
  i1e,
  iv,
  k0,
  k0e,
  k1,
  k1e,
  kn,
  hyperg,
  hyp2f1,
  ellpe,
  ellie,
  ellpk,
  ellik,
  ellpj,
  btdtr,
  smirnov,
  kolmogorov,
  smirnovi,
  kolmogi,
  nbdtri,
  stdtri,
  bdtr,
  bdtrc,
  bdtri,
  chdtr,
  chdtrc,
  chdtri,
  fdtr,
  fdtrc,
  fdtri,
  gdtr,
  gdtrc,
  nbdtr,
  nbdtrc,
  ndtr,
  ndtri,
  pdtr,
  pdtrc,
  pdtri,
  stdtr,
  plancki,
  planckc,
  planckd,
  planckw,
  spence,
  zetac,
  zeta,
  struve,
  simpsn,
  cadd,
  csub,
  cmul,
  cdiv,
  csqrt,
  cexp,
  clog,
  ccos,
  cacos,
  csin,
  casin,
  ctan,
  catan,
  ccot,
  p1evl,
  polylog,
};
