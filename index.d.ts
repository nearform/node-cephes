type Complex = {
  [part in "real" | "imag"]: number;
};
declare const create: (real?: number, imag?: number) => Complex;

declare const compiled: Promise<void>;

declare function signbit(x: number): number;
declare function csinh(z: Complex, w: Complex): Complex;
declare function casinh(z: Complex, w: Complex): Complex;
declare function ccosh(z: Complex, w: Complex): Complex;
declare function cacosh(z: Complex, w: Complex): Complex;
declare function ctanh(z: Complex, w: Complex): Complex;
declare function catanh(z: Complex, w: Complex): Complex;
declare function cpow(a: Complex, z: Complex, w: Complex): Complex;
declare function cneg(a: Complex): Complex;
declare function isnan(x: number): number;
declare function isfinite(x: number): number;
declare function sqrt(x: number): number;
declare function cbrt(x: number): number;
declare function polevl(x: number, coef: Float64Array, N: number): number;
declare function chbevl(x: number, array: Float64Array, n: number): number;
declare function round(x: number): number;
declare function ceil(x: number): number;
declare function floor(x: number): number;
declare function frexp(x: number): readonly [
  number,
  {
    readonly pw2: number;
  },
];
declare function ldexp(x: number, pw2: number): number;
declare function fabs(x: number): number;
declare function expx2(x: number, sign: number): number;
declare function radian(d: number, m: number, s: number): number;
declare function sincos(
  x: number,
  flg: number,
): readonly [
  number,
  {
    readonly s: number;
    readonly c: number;
  },
];
declare function cot(x: number): number;
declare function cotdg(x: number): number;
declare function log1p(x: number): number;
declare function expm1(x: number): number;
declare function cosm1(x: number): number;
declare function acos(x: number): number;
declare function acosh(x: number): number;
declare function asinh(xx: number): number;
declare function atanh(x: number): number;
declare function asin(x: number): number;
declare function atan(x: number): number;
declare function atan2(y: number, x: number): number;
declare function cos(x: number): number;
declare function cosdg(x: number): number;
declare function exp(x: number): number;
declare function exp2(x: number): number;
declare function exp10(x: number): number;
declare function cosh(x: number): number;
declare function sinh(x: number): number;
declare function tanh(x: number): number;
declare function log(x: number): number;
declare function log2(x: number): number;
declare function log10(x: number): number;
declare function pow(x: number, y: number): number;
declare function powi(x: number, nn: number): number;
declare function sin(x: number): number;
declare function sindg(x: number): number;
declare function tan(x: number): number;
declare function tandg(x: number): number;
declare function ei(x: number): number;
declare function expn(n: number, x: number): number;
declare function shichi(x: number): readonly [
  number,
  {
    readonly si: number;
    readonly ci: number;
  },
];
declare function sici(x: number): readonly [
  number,
  {
    readonly si: number;
    readonly ci: number;
  },
];
declare function lbeta(a: number, b: number): number;
declare function beta(a: number, b: number): number;
declare function fac(i: number): number;
declare function gamma(x: number): number;
declare function lgam(x: number): number;
declare function incbet(aa: number, bb: number, xx: number): number;
declare function incbi(aa: number, bb: number, yy0: number): number;
declare function igam(a: number, x: number): number;
declare function igamc(a: number, x: number): number;
declare function igami(a: number, y0: number): number;
declare function psi(x: number): number;
declare function rgamma(x: number): number;
declare function erf(x: number): number;
declare function erfc(a: number): number;
declare function dawsn(xx: number): number;
declare function fresnl(xxa: number): readonly [
  number,
  {
    readonly ssa: number;
    readonly cca: number;
  },
];
declare function airy(x: number): readonly [
  number,
  {
    readonly ai: number;
    readonly aip: number;
    readonly bi: number;
    readonly bip: number;
  },
];
declare function j0(x: number): number;
declare function j1(x: number): number;
declare function jn(n: number, x: number): number;
declare function jv(n: number, x: number): number;
declare function y0(x: number): number;
declare function y1(x: number): number;
declare function yn(n: number, x: number): number;
declare function yv(v: number, x: number): number;
declare function i0(x: number): number;
declare function i0e(x: number): number;
declare function i1(x: number): number;
declare function i1e(x: number): number;
declare function iv(v: number, x: number): number;
declare function k0(x: number): number;
declare function k0e(x: number): number;
declare function k1(x: number): number;
declare function k1e(x: number): number;
declare function kn(nn: number, x: number): number;
declare function hyperg(a: number, b: number, x: number): number;
declare function hyp2f1(a: number, b: number, c: number, x: number): number;
declare function ellpe(x: number): number;
declare function ellie(phi: number, m: number): number;
declare function ellpk(x: number): number;
declare function ellik(phi: number, m: number): number;
declare function ellpj(
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
declare function btdtr(a: number, b: number, x: number): number;
declare function smirnov(n: number, e: number): number;
declare function kolmogorov(y: number): number;
declare function smirnovi(n: number, p: number): number;
declare function kolmogi(p: number): number;
declare function nbdtri(k: number, n: number, p: number): number;
declare function stdtri(k: number, p: number): number;
declare function bdtr(k: number, n: number, p: number): number;
declare function bdtrc(k: number, n: number, p: number): number;
declare function bdtri(k: number, n: number, y: number): number;
declare function chdtr(df: number, x: number): number;
declare function chdtrc(df: number, x: number): number;
declare function chdtri(df: number, y: number): number;
declare function fdtr(ia: number, ib: number, x: number): number;
declare function fdtrc(ia: number, ib: number, x: number): number;
declare function fdtri(ia: number, ib: number, y: number): number;
declare function gdtr(a: number, b: number, x: number): number;
declare function gdtrc(a: number, b: number, x: number): number;
declare function nbdtr(k: number, n: number, p: number): number;
declare function nbdtrc(k: number, n: number, p: number): number;
declare function ndtr(a: number): number;
declare function ndtri(y0: number): number;
declare function pdtr(k: number, m: number): number;
declare function pdtrc(k: number, m: number): number;
declare function pdtri(k: number, y: number): number;
declare function stdtr(k: number, t: number): number;
declare function plancki(w: number, T: number): number;
declare function planckc(w: number, T: number): number;
declare function planckd(w: number, T: number): number;
declare function planckw(T: number): number;
declare function spence(x: number): number;
declare function zetac(x: number): number;
declare function zeta(x: number, q: number): number;
declare function struve(v: number, x: number): number;
declare function simpsn(f: Float64Array, delta: number): number;
declare function cadd(a: Complex, b: Complex, c: Complex): Complex;
declare function csub(a: Complex, b: Complex, c: Complex): Complex;
declare function cmul(a: Complex, b: Complex, c: Complex): Complex;
declare function cdiv(a: Complex, b: Complex, c: Complex): Complex;
declare function csqrt(z: Complex, w: Complex): Complex;
declare function cexp(z: Complex, w: Complex): Complex;
declare function clog(z: Complex, w: Complex): Complex;
declare function ccos(z: Complex, w: Complex): Complex;
declare function cacos(z: Complex, w: Complex): Complex;
declare function csin(z: Complex, w: Complex): Complex;
declare function casin(z: Complex, w: Complex): Complex;
declare function ctan(z: Complex, w: Complex): Complex;
declare function catan(z: Complex, w: Complex): Complex;
declare function ccot(z: Complex, w: Complex): Complex;
declare function p1evl(x: number, coef: Float64Array, N: number): number;
declare function polylog(n: number, x: number): number;
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

export {
  acos,
  acosh,
  airy,
  asin,
  asinh,
  atan,
  atan2,
  atanh,
  bdtr,
  bdtrc,
  bdtri,
  beta,
  btdtr,
  cacos,
  cacosh,
  cadd,
  casin,
  casinh,
  catan,
  catanh,
  cbrt,
  ccos,
  ccosh,
  ccot,
  cdiv,
  ceil,
  cexp,
  chbevl,
  chdtr,
  chdtrc,
  chdtri,
  clog,
  cmul,
  cneg,
  compiled,
  cos,
  cosdg,
  cosh,
  cosm1,
  cot,
  cotdg,
  cpow,
  create as createComplex,
  csin,
  csinh,
  csqrt,
  csub,
  ctan,
  ctanh,
  dawsn,
  _default as default,
  ei,
  ellie,
  ellik,
  ellpe,
  ellpj,
  ellpk,
  erf,
  erfc,
  exp,
  exp10,
  exp2,
  expm1,
  expn,
  expx2,
  fabs,
  fac,
  fdtr,
  fdtrc,
  fdtri,
  floor,
  fresnl,
  frexp,
  gamma,
  gdtr,
  gdtrc,
  hyp2f1,
  hyperg,
  i0,
  i0e,
  i1,
  i1e,
  igam,
  igamc,
  igami,
  incbet,
  incbi,
  isfinite,
  isnan,
  iv,
  j0,
  j1,
  jn,
  jv,
  k0,
  k0e,
  k1,
  k1e,
  kn,
  kolmogi,
  kolmogorov,
  lbeta,
  ldexp,
  lgam,
  log,
  log10,
  log1p,
  log2,
  nbdtr,
  nbdtrc,
  nbdtri,
  ndtr,
  ndtri,
  p1evl,
  pdtr,
  pdtrc,
  pdtri,
  planckc,
  planckd,
  plancki,
  planckw,
  polevl,
  polylog,
  pow,
  powi,
  psi,
  radian,
  rgamma,
  round,
  shichi,
  sici,
  signbit,
  simpsn,
  sin,
  sincos,
  sindg,
  sinh,
  smirnov,
  smirnovi,
  spence,
  sqrt,
  stdtr,
  stdtri,
  struve,
  tan,
  tandg,
  tanh,
  y0,
  y1,
  yn,
  yv,
  zeta,
  zetac,
};
