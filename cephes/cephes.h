#ifndef CEPHES_H
#define CEPHES_H
/* cephes/acosh.c */
double cephes_acosh(double x);
/* cephes/airy.c */
int cephes_airy(double x, double *ai, double *aip, double *bi, double *bip);
/* cephes/asin.c */
double cephes_asin(double x);
double cephes_acos(double x);
/* cephes/asinh.c */
double cephes_asinh(double xx);
/* cephes/atan.c */
double cephes_atan(double x);
double cephes_atan2(double y, double x);
/* cephes/atanh.c */
double cephes_atanh(double x);
/* cephes/bdtr.c */
double cephes_bdtrc(int k, int n, double p);
double cephes_bdtr(int k, int n, double p);
double cephes_bdtri(int k, int n, double y);
/* cephes/beta.c */
double cephes_beta(double a, double b);
double cephes_lbeta(double a, double b);
/* cephes/btdtr.c */
double cephes_btdtr(double a, double b, double x);
/* cephes/cbrt.c */
double cephes_cbrt(double x);
/* cephes/chbevl.c */
double chbevl(double x, double array[], int n);
/* cephes/chdtr.c */
double cephes_chdtrc(double df, double x);
double cephes_chdtr(double df, double x);
double cephes_chdtri(double df, double y);
/* cephes/const.c */
/* cephes/cosh.c */
double cephes_cosh(double x);
/* cephes/dawsn.c */
double cephes_dawsn(double xx);
/* cephes/ei.c */
double cephes_ei(double x);
/* cephes/ellie.c */
double cephes_ellie(double phi, double m);
/* cephes/ellik.c */
double cephes_ellik(double phi, double m);
/* cephes/ellpe.c */
double cephes_ellpe(double x);
/* cephes/ellpj.c */
int cephes_ellpj(double u, double m, double *sn, double *cn, double *dn, double *ph);
/* cephes/ellpk.c */
double cephes_ellpk(double x);
/* cephes/exp.c */
double cephes_exp(double x);
/* cephes/exp10.c */
double cephes_exp10(double x);
/* cephes/exp2.c */
double cephes_exp2(double x);
/* cephes/expn.c */
double cephes_expn(int n, double x);
/* cephes/expx2.c */
double cephes_expx2(double x, int sign);
/* cephes/fac.c */
double cephes_fac(int i);
/* cephes/fdtr.c */
double cephes_fdtrc(int ia, int ib, double x);
double cephes_fdtr(int ia, int ib, double x);
double cephes_fdtri(int ia, int ib, double y);
/* cephes/floor.c */
double cephes_frexp(double x, int *pw2);
double cephes_ldexp(double x, int pw2);
/* cephes/fresnl.c */
int cephes_fresnl(double xxa, double *ssa, double *cca);
/* cephes/gamma.c */
double cephes_gamma(double x);
double cephes_lgam(double x);
/* cephes/gdtr.c */
double cephes_gdtr(double a, double b, double x);
double cephes_gdtrc(double a, double b, double x);
/* cephes/hyp2f1.c */
double cephes_hyp2f1(double a, double b, double c, double x);
/* cephes/hyperg.c */
double cephes_hyperg(double a, double b, double x);
double cephes_hyp2f0(double a, double b, double x, int type, double *err);
/* cephes/i0.c */
double cephes_i0(double x);
double cephes_i0e(double x);
/* cephes/i1.c */
double cephes_i1(double x);
double cephes_i1e(double x);
/* cephes/igam.c */
double cephes_igamc(double a, double x);
double cephes_igam(double a, double x);
/* cephes/igami.c */
double cephes_igami(double a, double cephes_y0);
/* cephes/incbet.c */
double cephes_incbet(double aa, double bb, double xx);
/* cephes/incbi.c */
double cephes_incbi(double aa, double bb, double yy0);
/* cephes/isnan.c */
int cephes_signbit(double x);
int cephes_isnan(double x);
int cephes_isfinite(double x);
/* cephes/iv.c */
double cephes_iv(double v, double x);
/* cephes/j0.c */
double cephes_j0(double x);
double cephes_y0(double x);
/* cephes/j1.c */
double cephes_j1(double x);
double cephes_y1(double x);
/* cephes/jn.c */
double cephes_jn(int n, double x);
/* cephes/jv.c */
double cephes_jv(double n, double x);
/* cephes/k0.c */
double cephes_k0(double x);
double cephes_k0e(double x);
/* cephes/k1.c */
double cephes_k1(double x);
double cephes_k1e(double x);
/* cephes/kn.c */
double cephes_kn(int nn, double x);
/* cephes/kolmogorov.c */
double cephes_smirnov(int n, double e);
double cephes_kolmogorov(double y);
double cephes_smirnovi(int n, double p);
double cephes_kolmogi(double p);
/* cephes/log.c */
double cephes_log(double x);
/* cephes/log10.c */
double cephes_log10(double x);
/* cephes/log2.c */
double cephes_log2(double x);
/* cephes/nbdtr.c */
double cephes_nbdtrc(int k, int n, double p);
double cephes_nbdtr(int k, int n, double p);
double cephes_nbdtri(int k, int n, double p);
/* cephes/ndtr.c */
double cephes_ndtr(double a);
double cephes_erfc(double a);
double cephes_erf(double x);
/* cephes/ndtri.c */
double cephes_ndtri(double cephes_y0);
/* cephes/pdtr.c */
double cephes_pdtrc(int k, double m);
double cephes_pdtr(int k, double m);
double cephes_pdtri(int k, double y);
/* cephes/planck.c */
double cephes_plancki(double w, double T);
double cephes_planckc(double w, double T);
double cephes_planckd(double w, double T);
double cephes_planckw(double T);
/* cephes/polevl.c */
double polevl(double x, double coef[], int N);
double p1evl(double x, double coef[], int N);
/* cephes/polylog.c */
double cephes_polylog(int n, double x);
/* cephes/pow.c */
double cephes_pow(double x, double y);
/* cephes/powi.c */
double cephes_powi(double x, int nn);
/* cephes/psi.c */
double cephes_psi(double x);
/* cephes/rgamma.c */
double cephes_rgamma(double x);
/* cephes/round.c */
double cephes_round(double x);
/* cephes/shichi.c */
int cephes_shichi(double x, double *si, double *ci);
/* cephes/sici.c */
int cephes_sici(double x, double *si, double *ci);
/* cephes/sin.c */
double cephes_sin(double x);
double cephes_cos(double x);
double cephes_radian(double d, double m, double s);
/* cephes/sincos.c */
int cephes_sincos(double x, double *s, double *c, int flg);
/* cephes/sindg.c */
double cephes_sindg(double x);
double cephes_cosdg(double x);
/* cephes/sinh.c */
double cephes_sinh(double x);
/* cephes/spence.c */
double cephes_spence(double x);
/* cephes/stdtr.c */
double cephes_stdtr(int k, double t);
double cephes_stdtri(int k, double p);
/* cephes/struve.c */
double cephes_onef2(double a, double b, double c, double x, double *err);
double cephes_threef0(double a, double b, double c, double x, double *err);
double cephes_struve(double v, double x);
double cephes_yv(double v, double x);
/* cephes/tan.c */
double cephes_tan(double x);
double cephes_cot(double x);
/* cephes/tandg.c */
double cephes_tandg(double x);
double cephes_cotdg(double x);
/* cephes/tanh.c */
double cephes_tanh(double x);
/* cephes/unity.c */
double cephes_log1p(double x);
double cephes_expm1(double x);
double cephes_cosm1(double x);
/* cephes/yn.c */
double cephes_yn(int n, double x);
/* cephes/zeta.c */
double cephes_zeta(double x, double q);
/* cephes/zetac.c */
double cephes_zetac(double x);
#endif
