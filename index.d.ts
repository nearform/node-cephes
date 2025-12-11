import { type Complex, create as createComplex } from "./complex.js";
export declare const compiled: Promise<void>;
export { createComplex };
export declare function signbit(x: number): number;
export declare function csinh(z: Complex, w: Complex): Complex;
export declare function casinh(z: Complex, w: Complex): Complex;
export declare function ccosh(z: Complex, w: Complex): Complex;
export declare function cacosh(z: Complex, w: Complex): Complex;
export declare function ctanh(z: Complex, w: Complex): Complex;
export declare function catanh(z: Complex, w: Complex): Complex;
export declare function cpow(a: Complex, z: Complex, w: Complex): Complex;
export declare function cneg(a: Complex): Complex;
export declare function isnan(x: number): number;
export declare function isfinite(x: number): number;
export declare function sqrt(x: number): number;
export declare function cbrt(x: number): number;
export declare function polevl(
  x: number,
  coef: Float64Array,
  N: number,
): number;
export declare function chbevl(
  x: number,
  array: Float64Array,
  n: number,
): number;
export declare function round(x: number): number;
export declare function ceil(x: number): number;
export declare function floor(x: number): number;
export declare function frexp(x: number): readonly [
  number,
  {
    readonly pw2: number;
  },
];
export declare function ldexp(x: number, pw2: number): number;
export declare function fabs(x: number): number;
export declare function expx2(x: number, sign: number): number;
export declare function radian(d: number, m: number, s: number): number;
export declare function sincos(
  x: number,
  flg: number,
): readonly [
  number,
  {
    readonly s: number;
    readonly c: number;
  },
];
export declare function cot(x: number): number;
export declare function cotdg(x: number): number;
export declare function log1p(x: number): number;
export declare function expm1(x: number): number;
export declare function cosm1(x: number): number;
export declare function acos(x: number): number;
export declare function acosh(x: number): number;
export declare function asinh(xx: number): number;
export declare function atanh(x: number): number;
export declare function asin(x: number): number;
export declare function atan(x: number): number;
export declare function atan2(y: number, x: number): number;
export declare function cos(x: number): number;
export declare function cosdg(x: number): number;
export declare function exp(x: number): number;
export declare function exp2(x: number): number;
export declare function exp10(x: number): number;
export declare function cosh(x: number): number;
export declare function sinh(x: number): number;
export declare function tanh(x: number): number;
export declare function log(x: number): number;
export declare function log2(x: number): number;
export declare function log10(x: number): number;
export declare function pow(x: number, y: number): number;
export declare function powi(x: number, nn: number): number;
export declare function sin(x: number): number;
export declare function sindg(x: number): number;
export declare function tan(x: number): number;
export declare function tandg(x: number): number;
export declare function ei(x: number): number;
export declare function expn(n: number, x: number): number;
export declare function shichi(x: number): readonly [
  number,
  {
    readonly si: number;
    readonly ci: number;
  },
];
export declare function sici(x: number): readonly [
  number,
  {
    readonly si: number;
    readonly ci: number;
  },
];
export declare function lbeta(a: number, b: number): number;
export declare function beta(a: number, b: number): number;
export declare function fac(i: number): number;
export declare function gamma(x: number): number;
export declare function lgam(x: number): number;
export declare function incbet(aa: number, bb: number, xx: number): number;
export declare function incbi(aa: number, bb: number, yy0: number): number;
export declare function igam(a: number, x: number): number;
export declare function igamc(a: number, x: number): number;
export declare function igami(a: number, y0: number): number;
export declare function psi(x: number): number;
export declare function rgamma(x: number): number;
export declare function erf(x: number): number;
export declare function erfc(a: number): number;
export declare function dawsn(xx: number): number;
export declare function fresnl(xxa: number): readonly [
  number,
  {
    readonly ssa: number;
    readonly cca: number;
  },
];
export declare function airy(x: number): readonly [
  number,
  {
    readonly ai: number;
    readonly aip: number;
    readonly bi: number;
    readonly bip: number;
  },
];
export declare function j0(x: number): number;
export declare function j1(x: number): number;
export declare function jn(n: number, x: number): number;
export declare function jv(n: number, x: number): number;
export declare function y0(x: number): number;
export declare function y1(x: number): number;
export declare function yn(n: number, x: number): number;
export declare function yv(v: number, x: number): number;
export declare function i0(x: number): number;
export declare function i0e(x: number): number;
export declare function i1(x: number): number;
export declare function i1e(x: number): number;
export declare function iv(v: number, x: number): number;
export declare function k0(x: number): number;
export declare function k0e(x: number): number;
export declare function k1(x: number): number;
export declare function k1e(x: number): number;
export declare function kn(nn: number, x: number): number;
export declare function hyperg(a: number, b: number, x: number): number;
export declare function hyp2f1(
  a: number,
  b: number,
  c: number,
  x: number,
): number;
export declare function ellpe(x: number): number;
export declare function ellie(phi: number, m: number): number;
export declare function ellpk(x: number): number;
export declare function ellik(phi: number, m: number): number;
export declare function ellpj(
  u: number,
  m: number,
): readonly [
  number,
  {
    readonly sn: number;
    readonly cn: number;
    readonly dn: number;
    readonly ph: number;
  },
];
export declare function btdtr(a: number, b: number, x: number): number;
export declare function smirnov(n: number, e: number): number;
export declare function kolmogorov(y: number): number;
export declare function smirnovi(n: number, p: number): number;
export declare function kolmogi(p: number): number;
export declare function nbdtri(k: number, n: number, p: number): number;
export declare function stdtri(k: number, p: number): number;
export declare function bdtr(k: number, n: number, p: number): number;
export declare function bdtrc(k: number, n: number, p: number): number;
export declare function bdtri(k: number, n: number, y: number): number;
export declare function chdtr(df: number, x: number): number;
export declare function chdtrc(df: number, x: number): number;
export declare function chdtri(df: number, y: number): number;
export declare function fdtr(ia: number, ib: number, x: number): number;
export declare function fdtrc(ia: number, ib: number, x: number): number;
export declare function fdtri(ia: number, ib: number, y: number): number;
export declare function gdtr(a: number, b: number, x: number): number;
export declare function gdtrc(a: number, b: number, x: number): number;
export declare function nbdtr(k: number, n: number, p: number): number;
export declare function nbdtrc(k: number, n: number, p: number): number;
export declare function ndtr(a: number): number;
export declare function ndtri(y0: number): number;
export declare function pdtr(k: number, m: number): number;
export declare function pdtrc(k: number, m: number): number;
export declare function pdtri(k: number, y: number): number;
export declare function stdtr(k: number, t: number): number;
export declare function plancki(w: number, T: number): number;
export declare function planckc(w: number, T: number): number;
export declare function planckd(w: number, T: number): number;
export declare function planckw(T: number): number;
export declare function spence(x: number): number;
export declare function zetac(x: number): number;
export declare function zeta(x: number, q: number): number;
export declare function struve(v: number, x: number): number;
export declare function simpsn(f: Float64Array, delta: number): number;
export declare function cadd(a: Complex, b: Complex, c: Complex): Complex;
export declare function csub(a: Complex, b: Complex, c: Complex): Complex;
export declare function cmul(a: Complex, b: Complex, c: Complex): Complex;
export declare function cdiv(a: Complex, b: Complex, c: Complex): Complex;
export declare function csqrt(z: Complex, w: Complex): Complex;
export declare function cexp(z: Complex, w: Complex): Complex;
export declare function clog(z: Complex, w: Complex): Complex;
export declare function ccos(z: Complex, w: Complex): Complex;
export declare function cacos(z: Complex, w: Complex): Complex;
export declare function csin(z: Complex, w: Complex): Complex;
export declare function casin(z: Complex, w: Complex): Complex;
export declare function ctan(z: Complex, w: Complex): Complex;
export declare function catan(z: Complex, w: Complex): Complex;
export declare function ccot(z: Complex, w: Complex): Complex;
export declare function p1evl(x: number, coef: Float64Array, N: number): number;
export declare function polylog(n: number, x: number): number;
declare const _default: {
  compiled: Promise<void>;
  createComplex: (real?: number, imag?: number) => Complex;
  signbit: typeof signbit;
  csinh: typeof csinh;
  casinh: typeof casinh;
  ccosh: typeof ccosh;
  cacosh: typeof cacosh;
  ctanh: typeof ctanh;
  catanh: typeof catanh;
  cpow: typeof cpow;
  cneg: typeof cneg;
  isnan: typeof isnan;
  isfinite: typeof isfinite;
  sqrt: typeof sqrt;
  cbrt: typeof cbrt;
  polevl: typeof polevl;
  chbevl: typeof chbevl;
  round: typeof round;
  ceil: typeof ceil;
  floor: typeof floor;
  frexp: typeof frexp;
  ldexp: typeof ldexp;
  fabs: typeof fabs;
  expx2: typeof expx2;
  radian: typeof radian;
  sincos: typeof sincos;
  cot: typeof cot;
  cotdg: typeof cotdg;
  log1p: typeof log1p;
  expm1: typeof expm1;
  cosm1: typeof cosm1;
  acos: typeof acos;
  acosh: typeof acosh;
  asinh: typeof asinh;
  atanh: typeof atanh;
  asin: typeof asin;
  atan: typeof atan;
  atan2: typeof atan2;
  cos: typeof cos;
  cosdg: typeof cosdg;
  exp: typeof exp;
  exp2: typeof exp2;
  exp10: typeof exp10;
  cosh: typeof cosh;
  sinh: typeof sinh;
  tanh: typeof tanh;
  log: typeof log;
  log2: typeof log2;
  log10: typeof log10;
  pow: typeof pow;
  powi: typeof powi;
  sin: typeof sin;
  sindg: typeof sindg;
  tan: typeof tan;
  tandg: typeof tandg;
  ei: typeof ei;
  expn: typeof expn;
  shichi: typeof shichi;
  sici: typeof sici;
  lbeta: typeof lbeta;
  beta: typeof beta;
  fac: typeof fac;
  gamma: typeof gamma;
  lgam: typeof lgam;
  incbet: typeof incbet;
  incbi: typeof incbi;
  igam: typeof igam;
  igamc: typeof igamc;
  igami: typeof igami;
  psi: typeof psi;
  rgamma: typeof rgamma;
  erf: typeof erf;
  erfc: typeof erfc;
  dawsn: typeof dawsn;
  fresnl: typeof fresnl;
  airy: typeof airy;
  j0: typeof j0;
  j1: typeof j1;
  jn: typeof jn;
  jv: typeof jv;
  y0: typeof y0;
  y1: typeof y1;
  yn: typeof yn;
  yv: typeof yv;
  i0: typeof i0;
  i0e: typeof i0e;
  i1: typeof i1;
  i1e: typeof i1e;
  iv: typeof iv;
  k0: typeof k0;
  k0e: typeof k0e;
  k1: typeof k1;
  k1e: typeof k1e;
  kn: typeof kn;
  hyperg: typeof hyperg;
  hyp2f1: typeof hyp2f1;
  ellpe: typeof ellpe;
  ellie: typeof ellie;
  ellpk: typeof ellpk;
  ellik: typeof ellik;
  ellpj: typeof ellpj;
  btdtr: typeof btdtr;
  smirnov: typeof smirnov;
  kolmogorov: typeof kolmogorov;
  smirnovi: typeof smirnovi;
  kolmogi: typeof kolmogi;
  nbdtri: typeof nbdtri;
  stdtri: typeof stdtri;
  bdtr: typeof bdtr;
  bdtrc: typeof bdtrc;
  bdtri: typeof bdtri;
  chdtr: typeof chdtr;
  chdtrc: typeof chdtrc;
  chdtri: typeof chdtri;
  fdtr: typeof fdtr;
  fdtrc: typeof fdtrc;
  fdtri: typeof fdtri;
  gdtr: typeof gdtr;
  gdtrc: typeof gdtrc;
  nbdtr: typeof nbdtr;
  nbdtrc: typeof nbdtrc;
  ndtr: typeof ndtr;
  ndtri: typeof ndtri;
  pdtr: typeof pdtr;
  pdtrc: typeof pdtrc;
  pdtri: typeof pdtri;
  stdtr: typeof stdtr;
  plancki: typeof plancki;
  planckc: typeof planckc;
  planckd: typeof planckd;
  planckw: typeof planckw;
  spence: typeof spence;
  zetac: typeof zetac;
  zeta: typeof zeta;
  struve: typeof struve;
  simpsn: typeof simpsn;
  cadd: typeof cadd;
  csub: typeof csub;
  cmul: typeof cmul;
  cdiv: typeof cdiv;
  csqrt: typeof csqrt;
  cexp: typeof cexp;
  clog: typeof clog;
  ccos: typeof ccos;
  cacos: typeof cacos;
  csin: typeof csin;
  casin: typeof casin;
  ctan: typeof ctan;
  catan: typeof catan;
  ccot: typeof ccot;
  p1evl: typeof p1evl;
  polylog: typeof polylog;
};
export default _default;
