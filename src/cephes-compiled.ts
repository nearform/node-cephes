
export type TypedArray =
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Float32Array
  | Float64Array;
export type Pointer = number
export type PointerType = "i8" | "i16" | "i32" | "i64" | "float" | "double"
export interface CephesPackage {
  stackSave: () => number
  stackRestore: (ptr: Pointer) => void
  stackAlloc: (n: number) => Pointer
  writeArrayToMemory: (arr: TypedArray, p: Pointer) => void
  getValue: (ptr: Pointer, type: PointerType) => number
}
export class CephesCompiled {
  compiled?: Promise<void>
  cmath!: CephesPackage
  // from cephes/cmath/isnan.c
  cephes_signbit!: (x: number)=>number;

  // from cephes/cmath/isnan.c
  cephes_isnan!: (x: number)=>number;

  // from cephes/cmath/isnan.c
  cephes_isfinite!: (x: number)=>number;

  // from cephes/cmath/sqrt.c
  cephes_sqrt!: (x: number)=>number;

  // from cephes/cmath/cbrt.c
  cephes_cbrt!: (x: number)=>number;

  misc!: CephesPackage
  // from cephes/misc/polevl.c
  cephes_polevl!: (x: number, coef: Pointer, N: number)=>number;

  // from cephes/misc/chbevl.c
  cephes_chbevl!: (x: number, array: Pointer, n: number)=>number;

  // from cephes/cmath/round.c
  cephes_round!: (x: number)=>number;

  // from cephes/cmath/floor.c
  cephes_ceil!: (x: number)=>number;

  // from cephes/cmath/floor.c
  cephes_floor!: (x: number)=>number;

  // from cephes/cmath/floor.c
  cephes_frexp!: (x: number, pw2: Pointer)=>number;

  // from cephes/cmath/floor.c
  cephes_ldexp!: (x: number, pw2: number)=>number;

  // from cephes/cmath/fabs.c
  cephes_fabs!: (x: number)=>number;

  cprob!: CephesPackage
  // from cephes/cprob/expx2.c
  cephes_expx2!: (x: number, sign: number)=>number;

  // from cephes/cmath/sin.c
  cephes_radian!: (d: number, m: number, s: number)=>number;

  // from cephes/cmath/sincos.c
  cephes_sincos!: (x: number, s: Pointer, c: Pointer, flg: number)=>number;

  // from cephes/cmath/tan.c
  cephes_cot!: (x: number)=>number;

  // from cephes/cmath/tandg.c
  cephes_cotdg!: (x: number)=>number;

  // from cephes/cprob/unity.c
  cephes_log1p!: (x: number)=>number;

  // from cephes/cprob/unity.c
  cephes_expm1!: (x: number)=>number;

  // from cephes/cprob/unity.c
  cephes_cosm1!: (x: number)=>number;

  // from cephes/cmath/asin.c
  cephes_acos!: (x: number)=>number;

  // from cephes/cmath/acosh.c
  cephes_acosh!: (x: number)=>number;

  // from cephes/cmath/asinh.c
  cephes_asinh!: (xx: number)=>number;

  // from cephes/cmath/atanh.c
  cephes_atanh!: (x: number)=>number;

  // from cephes/cmath/asin.c
  cephes_asin!: (x: number)=>number;

  // from cephes/cmath/atan.c
  cephes_atan!: (x: number)=>number;

  // from cephes/cmath/atan.c
  cephes_atan2!: (y: number, x: number)=>number;

  // from cephes/cmath/sin.c
  cephes_cos!: (x: number)=>number;

  // from cephes/cmath/sindg.c
  cephes_cosdg!: (x: number)=>number;

  // from cephes/cmath/exp.c
  cephes_exp!: (x: number)=>number;

  // from cephes/cmath/exp2.c
  cephes_exp2!: (x: number)=>number;

  // from cephes/cmath/exp10.c
  cephes_exp10!: (x: number)=>number;

  // from cephes/cmath/cosh.c
  cephes_cosh!: (x: number)=>number;

  // from cephes/cmath/sinh.c
  cephes_sinh!: (x: number)=>number;

  // from cephes/cmath/tanh.c
  cephes_tanh!: (x: number)=>number;

  // from cephes/cmath/log.c
  cephes_log!: (x: number)=>number;

  // from cephes/cmath/log2.c
  cephes_log2!: (x: number)=>number;

  // from cephes/cmath/log10.c
  cephes_log10!: (x: number)=>number;

  // from cephes/cmath/pow.c
  cephes_pow!: (x: number, y: number)=>number;

  // from cephes/cmath/powi.c
  cephes_powi!: (x: number, nn: number)=>number;

  // from cephes/cmath/sin.c
  cephes_sin!: (x: number)=>number;

  // from cephes/cmath/sindg.c
  cephes_sindg!: (x: number)=>number;

  // from cephes/cmath/tan.c
  cephes_tan!: (x: number)=>number;

  // from cephes/cmath/tandg.c
  cephes_tandg!: (x: number)=>number;

  // from cephes/misc/ei.c
  cephes_ei!: (x: number)=>number;

  // from cephes/misc/expn.c
  cephes_expn!: (n: number, x: number)=>number;

  // from cephes/misc/shichi.c
  cephes_shichi!: (x: number, si: Pointer, ci: Pointer)=>number;

  // from cephes/misc/sici.c
  cephes_sici!: (x: number, si: Pointer, ci: Pointer)=>number;

  // from cephes/misc/beta.c
  cephes_lbeta!: (a: number, b: number)=>number;

  // from cephes/misc/beta.c
  cephes_beta!: (a: number, b: number)=>number;

  // from cephes/misc/fac.c
  cephes_fac!: (i: number)=>number;

  // from cephes/cprob/gamma.c
  cephes_gamma!: (x: number)=>number;

  // from cephes/cprob/gamma.c
  cephes_lgam!: (x: number)=>number;

  // from cephes/cprob/incbet.c
  cephes_incbet!: (aa: number, bb: number, xx: number)=>number;

  // from cephes/cprob/incbi.c
  cephes_incbi!: (aa: number, bb: number, yy0: number)=>number;

  // from cephes/cprob/igam.c
  cephes_igam!: (a: number, x: number)=>number;

  // from cephes/cprob/igam.c
  cephes_igamc!: (a: number, x: number)=>number;

  // from cephes/cprob/igami.c
  cephes_igami!: (a: number, y0: number)=>number;

  // from cephes/misc/psi.c
  cephes_psi!: (x: number)=>number;

  // from cephes/misc/rgamma.c
  cephes_rgamma!: (x: number)=>number;

  // from cephes/cprob/ndtr.c
  cephes_erf!: (x: number)=>number;

  // from cephes/cprob/ndtr.c
  cephes_erfc!: (a: number)=>number;

  // from cephes/misc/dawsn.c
  cephes_dawsn!: (xx: number)=>number;

  // from cephes/misc/fresnl.c
  cephes_fresnl!: (xxa: number, ssa: Pointer, cca: Pointer)=>number;

  bessel!: CephesPackage
  // from cephes/bessel/airy.c
  cephes_airy!: (x: number, ai: Pointer, aip: Pointer, bi: Pointer, bip: Pointer)=>number;

  // from cephes/bessel/j0.c
  cephes_j0!: (x: number)=>number;

  // from cephes/bessel/j1.c
  cephes_j1!: (x: number)=>number;

  // from cephes/bessel/jn.c
  cephes_jn!: (n: number, x: number)=>number;

  // from cephes/bessel/jv.c
  cephes_jv!: (n: number, x: number)=>number;

  // from cephes/bessel/j0.c
  cephes_y0!: (x: number)=>number;

  // from cephes/bessel/j1.c
  cephes_y1!: (x: number)=>number;

  // from cephes/bessel/yn.c
  cephes_yn!: (n: number, x: number)=>number;

  // from cephes/bessel/struve.c
  cephes_yv!: (v: number, x: number)=>number;

  // from cephes/bessel/i0.c
  cephes_i0!: (x: number)=>number;

  // from cephes/bessel/i0.c
  cephes_i0e!: (x: number)=>number;

  // from cephes/bessel/i1.c
  cephes_i1!: (x: number)=>number;

  // from cephes/bessel/i1.c
  cephes_i1e!: (x: number)=>number;

  // from cephes/bessel/iv.c
  cephes_iv!: (v: number, x: number)=>number;

  // from cephes/bessel/k0.c
  cephes_k0!: (x: number)=>number;

  // from cephes/bessel/k0.c
  cephes_k0e!: (x: number)=>number;

  // from cephes/bessel/k1.c
  cephes_k1!: (x: number)=>number;

  // from cephes/bessel/k1.c
  cephes_k1e!: (x: number)=>number;

  // from cephes/bessel/kn.c
  cephes_kn!: (nn: number, x: number)=>number;

  // from cephes/bessel/hyperg.c
  cephes_hyperg!: (a: number, b: number, x: number)=>number;

  // from cephes/bessel/hyp2f1.c
  cephes_hyp2f1!: (a: number, b: number, c: number, x: number)=>number;

  ellf!: CephesPackage
  // from cephes/ellf/ellpe.c
  cephes_ellpe!: (x: number)=>number;

  // from cephes/ellf/ellie.c
  cephes_ellie!: (phi: number, m: number)=>number;

  // from cephes/ellf/ellpk.c
  cephes_ellpk!: (x: number)=>number;

  // from cephes/ellf/ellik.c
  cephes_ellik!: (phi: number, m: number)=>number;

  // from cephes/ellf/ellpj.c
  cephes_ellpj!: (u: number, m: number, sn: Pointer, cn: Pointer, dn: Pointer, ph: Pointer)=>number;

  // from cephes/cprob/btdtr.c
  cephes_btdtr!: (a: number, b: number, x: number)=>number;

  // from cephes/cprob/kolmogorov.c
  cephes_smirnov!: (n: number, e: number)=>number;

  // from cephes/cprob/kolmogorov.c
  cephes_kolmogorov!: (y: number)=>number;

  // from cephes/cprob/kolmogorov.c
  cephes_smirnovi!: (n: number, p: number)=>number;

  // from cephes/cprob/kolmogorov.c
  cephes_kolmogi!: (p: number)=>number;

  // from cephes/cprob/nbdtr.c
  cephes_nbdtri!: (k: number, n: number, p: number)=>number;

  // from cephes/cprob/stdtr.c
  cephes_stdtri!: (k: number, p: number)=>number;

  // from cephes/cprob/bdtr.c
  cephes_bdtr!: (k: number, n: number, p: number)=>number;

  // from cephes/cprob/bdtr.c
  cephes_bdtrc!: (k: number, n: number, p: number)=>number;

  // from cephes/cprob/bdtr.c
  cephes_bdtri!: (k: number, n: number, y: number)=>number;

  // from cephes/cprob/chdtr.c
  cephes_chdtr!: (df: number, x: number)=>number;

  // from cephes/cprob/chdtr.c
  cephes_chdtrc!: (df: number, x: number)=>number;

  // from cephes/cprob/chdtr.c
  cephes_chdtri!: (df: number, y: number)=>number;

  // from cephes/cprob/fdtr.c
  cephes_fdtr!: (ia: number, ib: number, x: number)=>number;

  // from cephes/cprob/fdtr.c
  cephes_fdtrc!: (ia: number, ib: number, x: number)=>number;

  // from cephes/cprob/fdtr.c
  cephes_fdtri!: (ia: number, ib: number, y: number)=>number;

  // from cephes/cprob/gdtr.c
  cephes_gdtr!: (a: number, b: number, x: number)=>number;

  // from cephes/cprob/gdtr.c
  cephes_gdtrc!: (a: number, b: number, x: number)=>number;

  // from cephes/cprob/nbdtr.c
  cephes_nbdtr!: (k: number, n: number, p: number)=>number;

  // from cephes/cprob/nbdtr.c
  cephes_nbdtrc!: (k: number, n: number, p: number)=>number;

  // from cephes/cprob/ndtr.c
  cephes_ndtr!: (a: number)=>number;

  // from cephes/cprob/ndtri.c
  cephes_ndtri!: (y0: number)=>number;

  // from cephes/cprob/pdtr.c
  cephes_pdtr!: (k: number, m: number)=>number;

  // from cephes/cprob/pdtr.c
  cephes_pdtrc!: (k: number, m: number)=>number;

  // from cephes/cprob/pdtr.c
  cephes_pdtri!: (k: number, y: number)=>number;

  // from cephes/cprob/stdtr.c
  cephes_stdtr!: (k: number, t: number)=>number;

  // from cephes/misc/planck.c
  cephes_plancki!: (w: number, T: number)=>number;

  // from cephes/misc/planck.c
  cephes_planckc!: (w: number, T: number)=>number;

  // from cephes/misc/planck.c
  cephes_planckd!: (w: number, T: number)=>number;

  // from cephes/misc/planck.c
  cephes_planckw!: (T: number)=>number;

  // from cephes/misc/spence.c
  cephes_spence!: (x: number)=>number;

  // from cephes/misc/zetac.c
  cephes_zetac!: (x: number)=>number;

  // from cephes/misc/zeta.c
  cephes_zeta!: (x: number, q: number)=>number;

  // from cephes/bessel/struve.c
  cephes_struve!: (v: number, x: number)=>number;

  // from cephes/misc/simpsn.c
  cephes_simpsn!: (f: Pointer, delta: number)=>number;

  // from cephes/misc/polevl.c
  cephes_p1evl!: (x: number, coef: Pointer, N: number)=>number;

  // from cephes/misc/polylog.c
  cephes_polylog!: (n: number, x: number)=>number;

}
export type CephesPackageName = "cmath" | "misc" | "cprob" | "bessel" | "ellf"