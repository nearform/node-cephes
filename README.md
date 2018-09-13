# node-cephes

<!--
Hello! curious reader. The README.md file is automatically generated, if you
wish to make any corrections we wellcome you to do so, just make sure you
make then in the build/ directory and not in README.md, thanks :)
-->

This is a WebAssembly packaging of the [cephes library](http://www.netlib.org/cephes/).
The cephes library contains C implementations of most
[special functions](https://en.wikipedia.org/wiki/Special_functions),
[distributions](https://en.wikipedia.org/wiki/Probability_distribution),
and other hard-to-implement mathematical functions.

_Note that there are a few cephes functions that are not exposed here, as some
of them are quite hard to make consumable in JavaScript using WebAssembly. Feel
free to send a pull request if you need one of them._

## Install

```
npm install cephes
```

If you are looking on GitHub, you will notice some files are missing. These
are statically built from the cephes library. See the
[CONTRIBUTING.md](CONTRIBUTING.md) file, for how to build them.

## Usage

Cephes is a WebAssembly module but is very small and fast to compile, as it
doesn't depend on any runtime libraries. In Node.js it is therefore compiled
synchronously and all you need to do is require the module.

```js
const cephes = require('cephes'); // Node.js
```

In the browser, it is, for good practice, compiled asynchronously. You must
therefore wait for the `.compiled` promise to be resolved.

```js
const cephes = require('cephes'); // Browser
await cephes.compiled;
```

Note that the `.compiled` promise is also available in Node.js, but it is
simply a dummy promise that resolves immediately.

### The JavaScript interface

There are three variations of functions to be aware of:

#### 1. Plain numeric function

These don't require anything special.

```js
const value = cephes.zeta(2, 1);
```

#### 2. Functions that return more than one value

In C, these functions return a primary value and then return extra value
using pointer arguments. In JavaScript this is implemented as a function
that returns an array of length 2. The first element is the primary returned
value, the second is an object of the extra returned values.

```js
const [value, {ai, aip, bi, bip}] = cephes.airy(-1);
```

#### 3. Functions that consumes an array

Some functions consumes an array of values, these must be `TypedArrays` of
the appropriate type. These functions will typically also require a variation
of `.length` value as a parameter, like you would do in C. Be aware, that in
some cases it may not be exactly the `.length` of the `TypedArray`, but may be
one less or one more. Check the specific function documentation to be sure.

```js
const arrayInput = new Float64Array([2.2, 3.3, 4.4]);
const value = ephes.polevl(1.1, arrayInput, arrayInput.length - 1);
```

## Table of Content

<table>
<thead>
  <th>Function</th>
  <th>Description</th>
  <th>Documentation</th>
</thead>
<tbody>
  <tr>
    <td colspan="3"><strong>Arithmetic and Algebraic</strong></td>
  </tr>
  <tr>
    <td><code>signbit(x)</code></td>
    <td>Returns the sign bit</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#signbit">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#int--cephessignbitx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>isnan(x)</code></td>
    <td>Check if Not-A-Number</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#isnan">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#int--cephesisnanx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>isfinite(x)</code></td>
    <td>Check if finite</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#isfinite">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#int--cephesisfinitex-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>cbrt(x)</code></td>
    <td>Cube root</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#cbrt">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephescbrtx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>polevl(x, coef, N)</code></td>
    <td>Evaluate polynomial</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#polevl">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephespolevlx-double-coef-float64array-n-int">js-doc</a></td>
</tr>
  <tr>
    <td><code>chbevl(x, array, n)</code></td>
    <td>Evaluate Chebyshev series</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#chbevl">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheschbevlx-double-array-float64array-n-int">js-doc</a></td>
</tr>
  <tr>
    <td><code>round(x)</code></td>
    <td>Round to nearest integer value</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#round">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesroundx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>frexp(x)</code></td>
    <td>Extract exponent</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#frexp">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double-extra--cephesfrexpx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>ldexp(x, pw2)</code></td>
    <td>Add integer to exponent</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#ldexp">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesldexpx-double-pw2-int">js-doc</a></td>
</tr>
  <tr>
    <td colspan="3"><strong>Exponential and Trigonometric</strong></td>
  </tr>
  <tr>
    <td><code>expx2(x, sign)</code></td>
    <td>Exponential of squared argument</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#expx2">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesexpx2x-double-sign-int">js-doc</a></td>
</tr>
  <tr>
    <td><code>radian(d, m, s)</code></td>
    <td>Degrees, minutes, seconds to radians</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#radian">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesradiand-double-m-double-s-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>sincos(x, flg)</code></td>
    <td>Circular sine and cosine of argument in degrees</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#sincos">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#int-extra--cephessincosx-double-flg-int">js-doc</a></td>
</tr>
  <tr>
    <td><code>cot(x)</code></td>
    <td>Circular cotangent</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#cot">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephescotx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>cotdg(x)</code></td>
    <td>Circular cotangent of argument in degrees</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#cotdg">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephescotdgx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>log1p(x)</code></td>
    <td>Relative error approximations for log(1 + x)</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#log1p">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheslog1px-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>expm1(x)</code></td>
    <td>Relative error approximations for exp(x) - 1</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#expm1">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesexpm1x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>cosm1(x)</code></td>
    <td>Relative error approximations for cos(x) - 1</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#cosm1">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephescosm1x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>acos(x)</code></td>
    <td>Arc cosine</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#acos">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesacosx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>acosh(x)</code></td>
    <td>Arc hyperbolic cosine</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#acosh">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesacoshx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>asinh(xx)</code></td>
    <td>Arc hyperbolic sine</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#asinh">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesasinhxx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>atanh(x)</code></td>
    <td>Arc hyperbolic tangent</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#atanh">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesatanhx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>asin(x)</code></td>
    <td>Arcsine</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#asin">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesasinx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>atan(x)</code></td>
    <td>Arctangent</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#atan">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesatanx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>atan2(y, x)</code></td>
    <td>Quadrant correct arctangent</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#atan2">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesatan2y-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>cos(x)</code></td>
    <td>Cosine</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#cos">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephescosx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>cosdg(x)</code></td>
    <td>Cosine of arg in degrees</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#cosdg">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephescosdgx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>exp(x)</code></td>
    <td>Exponential, base e</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#exp">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesexpx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>exp2(x)</code></td>
    <td>Exponential, base 2</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#exp2">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesexp2x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>exp10(x)</code></td>
    <td>Exponential, base 10</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#exp10">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesexp10x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>cosh(x)</code></td>
    <td>Hyperbolic cosine</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#cosh">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephescoshx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>sinh(x)</code></td>
    <td>Hyperbolic sine</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#sinh">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephessinhx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>tanh(x)</code></td>
    <td>Hyperbolic tangent</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#tanh">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephestanhx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>log(x)</code></td>
    <td>Logarithm, base e</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#log">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheslogx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>log2(x)</code></td>
    <td>Logarithm, base 2</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#log2">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheslog2x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>log10(x)</code></td>
    <td>Logarithm, base 10</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#log10">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheslog10x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>pow(x, y)</code></td>
    <td>Power</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#pow">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephespowx-double-y-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>powi(x, nn)</code></td>
    <td>Integer Power</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#powi">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephespowix-double-nn-int">js-doc</a></td>
</tr>
  <tr>
    <td><code>sin(x)</code></td>
    <td>Sine</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#sin">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephessinx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>sindg(x)</code></td>
    <td>Sine of arg in degrees</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#sindg">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephessindgx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>tan(x)</code></td>
    <td>Tangent</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#tan">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephestanx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>tandg(x)</code></td>
    <td>Tangent of arg in degrees</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#tandg">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephestandgx-double">js-doc</a></td>
</tr>
  <tr>
    <td colspan="3"><strong>Exponential integral</strong></td>
  </tr>
  <tr>
    <td><code>ei(x)</code></td>
    <td>Exponential integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#ei">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheseix-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>expn(n, x)</code></td>
    <td>Exponential integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#expn">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesexpnn-int-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>shichi(x)</code></td>
    <td>Hyperbolic cosine integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#shichi">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#int-extra--cephesshichix-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>sici(x)</code></td>
    <td>Cosine integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#sici">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#int-extra--cephessicix-double">js-doc</a></td>
</tr>
  <tr>
    <td colspan="3"><strong>Gamma</strong></td>
  </tr>
  <tr>
    <td><code>lbeta(a, b)</code></td>
    <td>Natural log of |beta|.</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#lbeta">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheslbetaa-double-b-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>beta(a, b)</code></td>
    <td>Beta</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#beta">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesbetaa-double-b-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>fac(i)</code></td>
    <td>Factorial</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#fac">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesfaci-int">js-doc</a></td>
</tr>
  <tr>
    <td><code>gamma(x)</code></td>
    <td>Gamma</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#gamma">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesgammax-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>lgam(x)</code></td>
    <td>Logarithm of gamma function</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#lgam">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheslgamx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>incbet(aa, bb, xx)</code></td>
    <td>Incomplete beta integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#incbet">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesincbetaa-double-bb-double-xx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>incbi(aa, bb, yy0)</code></td>
    <td>Inverse beta integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#incbi">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesincbiaa-double-bb-double-yy0-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>igam(a, x)</code></td>
    <td>Incomplete gamma integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#igam">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesigama-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>igamc(a, x)</code></td>
    <td>Complemented gamma integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#igamc">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesigamca-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>igami(a, y0)</code></td>
    <td>Inverse gamma integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#igami">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesigamia-double-y0-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>psi(x)</code></td>
    <td>Psi (digamma) function</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#psi">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephespsix-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>rgamma(x)</code></td>
    <td>Reciprocal Gamma</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#rgamma">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesrgammax-double">js-doc</a></td>
</tr>
  <tr>
    <td colspan="3"><strong>Error function</strong></td>
  </tr>
  <tr>
    <td><code>erf(x)</code></td>
    <td>Error function</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#erf">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheserfx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>erfc(a)</code></td>
    <td>Complemented error function</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#erfc">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheserfca-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>dawsn(xx)</code></td>
    <td>Dawson's integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#dawsn">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesdawsnxx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>fresnl(xxa)</code></td>
    <td>Fresnel integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#fresnl">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#int-extra--cephesfresnlxxa-double">js-doc</a></td>
</tr>
  <tr>
    <td colspan="3"><strong>Bessel</strong></td>
  </tr>
  <tr>
    <td><code>airy(x)</code></td>
    <td>Airy</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#airy">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#int-extra--cephesairyx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>j0(x)</code></td>
    <td>Bessel, order 0</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#j0">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesj0x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>j1(x)</code></td>
    <td>Bessel, order 1</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#j1">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesj1x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>jn(n, x)</code></td>
    <td>Bessel, order n</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#jn">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesjnn-int-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>jv(n, x)</code></td>
    <td>Bessel, noninteger order</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#jv">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesjvn-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>y0(x)</code></td>
    <td>Bessel, second kind, order 0</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#y0">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesy0x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>y1(x)</code></td>
    <td>Bessel, second kind, order 1</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#y1">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesy1x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>yn(n, x)</code></td>
    <td>Bessel, second kind, order n</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#yn">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesynn-int-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>yv(v, x)</code></td>
    <td>Bessel, noninteger order</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#yv">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesyvv-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>i0(x)</code></td>
    <td>Modified Bessel, order 0</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#i0">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesi0x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>i0e(x)</code></td>
    <td>Exponentially scaled i0</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#i0e">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesi0ex-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>i1(x)</code></td>
    <td>Modified Bessel, order 1</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#i1">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesi1x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>i1e(x)</code></td>
    <td>Exponentially scaled i1</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#i1e">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesi1ex-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>iv(v, x)</code></td>
    <td>Modified Bessel, nonint. order</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#iv">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesivv-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>k0(x)</code></td>
    <td>Mod. Bessel, 3rd kind, order 0</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#k0">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesk0x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>k0e(x)</code></td>
    <td>Exponentially scaled k0</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#k0e">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesk0ex-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>k1(x)</code></td>
    <td>Mod. Bessel, 3rd kind, order 1</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#k1">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesk1x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>k1e(x)</code></td>
    <td>Exponentially scaled k1</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#k1e">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesk1ex-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>kn(nn, x)</code></td>
    <td>Mod. Bessel, 3rd kind, order n</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#kn">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesknnn-int-x-double">js-doc</a></td>
</tr>
  <tr>
    <td colspan="3"><strong>Hypergeometric</strong></td>
  </tr>
  <tr>
    <td><code>hyperg(a, b, x)</code></td>
    <td>Confluent hypergeometric</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#hyperg">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheshyperga-double-b-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>hyp2f1(a, b, c, x)</code></td>
    <td>Gauss hypergeometric function</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#hyp2f1">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheshyp2f1a-double-b-double-c-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td colspan="3"><strong>Elliptic</strong></td>
  </tr>
  <tr>
    <td><code>ellpe(x)</code></td>
    <td>Complete elliptic integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#ellpe">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesellpex-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>ellie(phi, m)</code></td>
    <td>Incomplete elliptic integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#ellie">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheselliephi-double-m-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>ellpk(x)</code></td>
    <td>Complete elliptic integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#ellpk">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesellpkx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>ellik(phi, m)</code></td>
    <td>Incomplete elliptic integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#ellik">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesellikphi-double-m-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>ellpj(u, m)</code></td>
    <td>Jacobian elliptic function</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#ellpj">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#int-extra--cephesellpju-double-m-double">js-doc</a></td>
</tr>
  <tr>
    <td colspan="3"><strong>Probability</strong></td>
  </tr>
  <tr>
    <td><code>btdtr(a, b, x)</code></td>
    <td>Beta distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#btdtr">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesbtdtra-double-b-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>smirnov(n, e)</code></td>
    <td>Exact Smirnov statistic, for one-sided test.</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#smirnov">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephessmirnovn-int-e-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>kolmogorov(y)</code></td>
    <td>Kolmogorov's limiting distribution of two-sided test.</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#kolmogorov">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheskolmogorovy-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>smirnovi(n, p)</code></td>
    <td>Functional inverse of Smirnov distribution.</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#smirnovi">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephessmirnovin-int-p-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>kolmogi(p)</code></td>
    <td>Functional inverse of Kolmogorov statistic for two-sided test.</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#kolmogi">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheskolmogip-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>nbdtri(k, n, p)</code></td>
    <td>Inverse Negative binomial distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#nbdtri">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesnbdtrik-int-n-int-p-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>stdtri(k, p)</code></td>
    <td>Functional inverse of Student's t distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#stdtri">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesstdtrik-int-p-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>bdtr(k, n, p)</code></td>
    <td>Binomial distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#bdtr">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesbdtrk-int-n-int-p-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>bdtrc(k, n, p)</code></td>
    <td>Complemented binomial</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#bdtrc">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesbdtrck-int-n-int-p-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>bdtri(k, n, y)</code></td>
    <td>Inverse binomial</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#bdtri">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesbdtrik-int-n-int-y-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>chdtr(df, x)</code></td>
    <td>Chi square distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#chdtr">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheschdtrdf-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>chdtrc(df, x)</code></td>
    <td>Complemented Chi square</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#chdtrc">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheschdtrcdf-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>chdtri(df, y)</code></td>
    <td>Inverse Chi square</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#chdtri">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheschdtridf-double-y-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>fdtr(ia, ib, x)</code></td>
    <td>F distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#fdtr">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesfdtria-int-ib-int-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>fdtrc(ia, ib, x)</code></td>
    <td>Complemented F</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#fdtrc">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesfdtrcia-int-ib-int-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>fdtri(ia, ib, y)</code></td>
    <td>Inverse F distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#fdtri">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesfdtriia-int-ib-int-y-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>gdtr(a, b, x)</code></td>
    <td>Gamma distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#gdtr">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesgdtra-double-b-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>gdtrc(a, b, x)</code></td>
    <td>Complemented gamma</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#gdtrc">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesgdtrca-double-b-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>nbdtr(k, n, p)</code></td>
    <td>Negative binomial distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#nbdtr">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesnbdtrk-int-n-int-p-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>nbdtrc(k, n, p)</code></td>
    <td>Complemented negative binomial</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#nbdtrc">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesnbdtrck-int-n-int-p-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>ndtr(a)</code></td>
    <td>Normal distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#ndtr">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesndtra-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>ndtri(y0)</code></td>
    <td>Inverse normal distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#ndtri">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesndtriy0-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>pdtr(k, m)</code></td>
    <td>Poisson distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#pdtr">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephespdtrk-int-m-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>pdtrc(k, m)</code></td>
    <td>Complemented Poisson</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#pdtrc">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephespdtrck-int-m-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>pdtri(k, y)</code></td>
    <td>Inverse Poisson distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#pdtri">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephespdtrik-int-y-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>stdtr(k, t)</code></td>
    <td>Student's t distribution</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#stdtr">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesstdtrk-int-t-double">js-doc</a></td>
</tr>
  <tr>
    <td colspan="3"><strong>Miscellaneous</strong></td>
  </tr>
  <tr>
    <td><code>plancki(w, T)</code></td>
    <td>Integral of Planck's black body radiation formula</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#plancki">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesplanckiw-double-t-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>planckc(w, T)</code></td>
    <td>Complemented Planck radiation integral</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#planckc">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesplanckcw-double-t-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>planckd(w, T)</code></td>
    <td>Planck's black body radiation formula</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#planckd">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesplanckdw-double-t-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>planckw(T)</code></td>
    <td>Wavelength, w, of maximum radiation at given temperature T.</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#planckw">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesplanckwt-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>spence(x)</code></td>
    <td>Dilogarithm</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#spence">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesspencex-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>zetac(x)</code></td>
    <td>Riemann Zeta function</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#zetac">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheszetacx-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>zeta(x, q)</code></td>
    <td>Two argument zeta function</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#zeta">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cepheszetax-double-q-double">js-doc</a></td>
</tr>
  <tr>
    <td><code>struve(v, x)</code></td>
    <td>Struve function</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#struve">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesstruvev-double-x-double">js-doc</a></td>
</tr>
  <tr>
    <td colspan="3"><strong>Polynomials and Power Series</strong></td>
  </tr>
  <tr>
    <td><code>p1evl(x, coef, N)</code></td>
    <td>Evaluate polynomial when coefficient of x is 1.0.</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#p1evl">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephesp1evlx-double-coef-float64array-n-int">js-doc</a></td>
</tr>
  <tr>
    <td><code>polylog(n, x)</code></td>
    <td>The polylogarithm of order n</td>
    <td><a href="http://www.netlib.org/cephes/doubldoc.html#polylog">c-doc</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="#double--cephespolylogn-int-x-double">js-doc</a></td>
</tr>

</tbody>
</table>

## Documentation

### Arithmetic and Algebraic

#### int = cephes.signbit(x: double)

`signbit` is the "Returns the sign bit". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#signbit.

```js
const ret = cephes.signbit(x);
```

#### int = cephes.isnan(x: double)

`isnan` is the "Check if Not-A-Number". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#isnan.

```js
const ret = cephes.isnan(x);
```

#### int = cephes.isfinite(x: double)

`isfinite` is the "Check if finite". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#isfinite.

```js
const ret = cephes.isfinite(x);
```

#### double = cephes.cbrt(x: double)

`cbrt` is the "Cube root". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#cbrt.

```js
const ret = cephes.cbrt(x);
```

#### double = cephes.polevl(x: double, coef: Float64Array, N: int)

`polevl` is the "Evaluate polynomial". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#polevl.

```js
const ret = cephes.polevl(x, new Float64Array(coef), N);
```

#### double = cephes.chbevl(x: double, array: Float64Array, n: int)

`chbevl` is the "Evaluate Chebyshev series". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#chbevl.

```js
const ret = cephes.chbevl(x, new Float64Array(array), n);
```

#### double = cephes.round(x: double)

`round` is the "Round to nearest integer value". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#round.

```js
const ret = cephes.round(x);
```

#### [double, extra] = cephes.frexp(x: double)

`frexp` is the "Extract exponent". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#frexp.

```js
const [ret, extra] = cephes.frexp(x);
```

The `extra` object contains the following values: 

```js
const {
  pw2: int
} = extra;
```

#### double = cephes.ldexp(x: double, pw2: int)

`ldexp` is the "Add integer to exponent". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#ldexp.

```js
const ret = cephes.ldexp(x, pw2);
```

### Exponential and Trigonometric

#### double = cephes.expx2(x: double, sign: int)

`expx2` is the "Exponential of squared argument". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#expx2.

```js
const ret = cephes.expx2(x, sign);
```

#### double = cephes.radian(d: double, m: double, s: double)

`radian` is the "Degrees, minutes, seconds to radians". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#radian.

```js
const ret = cephes.radian(d, m, s);
```

#### [int, extra] = cephes.sincos(x: double, flg: int)

`sincos` is the "Circular sine and cosine of argument in degrees". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#sincos.

```js
const [ret, extra] = cephes.sincos(x, flg);
```

The `extra` object contains the following values: 

```js
const {
  s: double,
  c: double
} = extra;
```

#### double = cephes.cot(x: double)

`cot` is the "Circular cotangent". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#cot.

```js
const ret = cephes.cot(x);
```

#### double = cephes.cotdg(x: double)

`cotdg` is the "Circular cotangent of argument in degrees". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#cotdg.

```js
const ret = cephes.cotdg(x);
```

#### double = cephes.log1p(x: double)

`log1p` is the "Relative error approximations for log(1 + x)". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#log1p.

```js
const ret = cephes.log1p(x);
```

#### double = cephes.expm1(x: double)

`expm1` is the "Relative error approximations for exp(x) - 1". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#expm1.

```js
const ret = cephes.expm1(x);
```

#### double = cephes.cosm1(x: double)

`cosm1` is the "Relative error approximations for cos(x) - 1". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#cosm1.

```js
const ret = cephes.cosm1(x);
```

#### double = cephes.acos(x: double)

`acos` is the "Arc cosine". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#acos.

```js
const ret = cephes.acos(x);
```

#### double = cephes.acosh(x: double)

`acosh` is the "Arc hyperbolic cosine". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#acosh.

```js
const ret = cephes.acosh(x);
```

#### double = cephes.asinh(xx: double)

`asinh` is the "Arc hyperbolic sine". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#asinh.

```js
const ret = cephes.asinh(xx);
```

#### double = cephes.atanh(x: double)

`atanh` is the "Arc hyperbolic tangent". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#atanh.

```js
const ret = cephes.atanh(x);
```

#### double = cephes.asin(x: double)

`asin` is the "Arcsine". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#asin.

```js
const ret = cephes.asin(x);
```

#### double = cephes.atan(x: double)

`atan` is the "Arctangent". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#atan.

```js
const ret = cephes.atan(x);
```

#### double = cephes.atan2(y: double, x: double)

`atan2` is the "Quadrant correct arctangent". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#atan2.

```js
const ret = cephes.atan2(y, x);
```

#### double = cephes.cos(x: double)

`cos` is the "Cosine". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#cos.

```js
const ret = cephes.cos(x);
```

#### double = cephes.cosdg(x: double)

`cosdg` is the "Cosine of arg in degrees". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#cosdg.

```js
const ret = cephes.cosdg(x);
```

#### double = cephes.exp(x: double)

`exp` is the "Exponential, base e". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#exp.

```js
const ret = cephes.exp(x);
```

#### double = cephes.exp2(x: double)

`exp2` is the "Exponential, base 2". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#exp2.

```js
const ret = cephes.exp2(x);
```

#### double = cephes.exp10(x: double)

`exp10` is the "Exponential, base 10". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#exp10.

```js
const ret = cephes.exp10(x);
```

#### double = cephes.cosh(x: double)

`cosh` is the "Hyperbolic cosine". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#cosh.

```js
const ret = cephes.cosh(x);
```

#### double = cephes.sinh(x: double)

`sinh` is the "Hyperbolic sine". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#sinh.

```js
const ret = cephes.sinh(x);
```

#### double = cephes.tanh(x: double)

`tanh` is the "Hyperbolic tangent". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#tanh.

```js
const ret = cephes.tanh(x);
```

#### double = cephes.log(x: double)

`log` is the "Logarithm, base e". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#log.

```js
const ret = cephes.log(x);
```

#### double = cephes.log2(x: double)

`log2` is the "Logarithm, base 2". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#log2.

```js
const ret = cephes.log2(x);
```

#### double = cephes.log10(x: double)

`log10` is the "Logarithm, base 10". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#log10.

```js
const ret = cephes.log10(x);
```

#### double = cephes.pow(x: double, y: double)

`pow` is the "Power". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#pow.

```js
const ret = cephes.pow(x, y);
```

#### double = cephes.powi(x: double, nn: int)

`powi` is the "Integer Power". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#powi.

```js
const ret = cephes.powi(x, nn);
```

#### double = cephes.sin(x: double)

`sin` is the "Sine". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#sin.

```js
const ret = cephes.sin(x);
```

#### double = cephes.sindg(x: double)

`sindg` is the "Sine of arg in degrees". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#sindg.

```js
const ret = cephes.sindg(x);
```

#### double = cephes.tan(x: double)

`tan` is the "Tangent". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#tan.

```js
const ret = cephes.tan(x);
```

#### double = cephes.tandg(x: double)

`tandg` is the "Tangent of arg in degrees". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#tandg.

```js
const ret = cephes.tandg(x);
```

### Exponential integral

#### double = cephes.ei(x: double)

`ei` is the "Exponential integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#ei.

```js
const ret = cephes.ei(x);
```

#### double = cephes.expn(n: int, x: double)

`expn` is the "Exponential integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#expn.

```js
const ret = cephes.expn(n, x);
```

#### [int, extra] = cephes.shichi(x: double)

`shichi` is the "Hyperbolic cosine integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#shichi.

```js
const [ret, extra] = cephes.shichi(x);
```

The `extra` object contains the following values: 

```js
const {
  si: double,
  ci: double
} = extra;
```

#### [int, extra] = cephes.sici(x: double)

`sici` is the "Cosine integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#sici.

```js
const [ret, extra] = cephes.sici(x);
```

The `extra` object contains the following values: 

```js
const {
  si: double,
  ci: double
} = extra;
```

### Gamma

#### double = cephes.lbeta(a: double, b: double)

`lbeta` is the "Natural log of |beta|.". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#lbeta.

```js
const ret = cephes.lbeta(a, b);
```

#### double = cephes.beta(a: double, b: double)

`beta` is the "Beta". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#beta.

```js
const ret = cephes.beta(a, b);
```

#### double = cephes.fac(i: int)

`fac` is the "Factorial". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#fac.

```js
const ret = cephes.fac(i);
```

#### double = cephes.gamma(x: double)

`gamma` is the "Gamma". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#gamma.

```js
const ret = cephes.gamma(x);
```

#### double = cephes.lgam(x: double)

`lgam` is the "Logarithm of gamma function". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#lgam.

```js
const ret = cephes.lgam(x);
```

#### double = cephes.incbet(aa: double, bb: double, xx: double)

`incbet` is the "Incomplete beta integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#incbet.

```js
const ret = cephes.incbet(aa, bb, xx);
```

#### double = cephes.incbi(aa: double, bb: double, yy0: double)

`incbi` is the "Inverse beta integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#incbi.

```js
const ret = cephes.incbi(aa, bb, yy0);
```

#### double = cephes.igam(a: double, x: double)

`igam` is the "Incomplete gamma integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#igam.

```js
const ret = cephes.igam(a, x);
```

#### double = cephes.igamc(a: double, x: double)

`igamc` is the "Complemented gamma integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#igamc.

```js
const ret = cephes.igamc(a, x);
```

#### double = cephes.igami(a: double, y0: double)

`igami` is the "Inverse gamma integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#igami.

```js
const ret = cephes.igami(a, y0);
```

#### double = cephes.psi(x: double)

`psi` is the "Psi (digamma) function". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#psi.

```js
const ret = cephes.psi(x);
```

#### double = cephes.rgamma(x: double)

`rgamma` is the "Reciprocal Gamma". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#rgamma.

```js
const ret = cephes.rgamma(x);
```

### Error function

#### double = cephes.erf(x: double)

`erf` is the "Error function". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#erf.

```js
const ret = cephes.erf(x);
```

#### double = cephes.erfc(a: double)

`erfc` is the "Complemented error function". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#erfc.

```js
const ret = cephes.erfc(a);
```

#### double = cephes.dawsn(xx: double)

`dawsn` is the "Dawson's integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#dawsn.

```js
const ret = cephes.dawsn(xx);
```

#### [int, extra] = cephes.fresnl(xxa: double)

`fresnl` is the "Fresnel integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#fresnl.

```js
const [ret, extra] = cephes.fresnl(xxa);
```

The `extra` object contains the following values: 

```js
const {
  ssa: double,
  cca: double
} = extra;
```

### Bessel

#### [int, extra] = cephes.airy(x: double)

`airy` is the "Airy". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#airy.

```js
const [ret, extra] = cephes.airy(x);
```

The `extra` object contains the following values: 

```js
const {
  ai: double,
  aip: double,
  bi: double,
  bip: double
} = extra;
```

#### double = cephes.j0(x: double)

`j0` is the "Bessel, order 0". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#j0.

```js
const ret = cephes.j0(x);
```

#### double = cephes.j1(x: double)

`j1` is the "Bessel, order 1". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#j1.

```js
const ret = cephes.j1(x);
```

#### double = cephes.jn(n: int, x: double)

`jn` is the "Bessel, order n". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#jn.

```js
const ret = cephes.jn(n, x);
```

#### double = cephes.jv(n: double, x: double)

`jv` is the "Bessel, noninteger order". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#jv.

```js
const ret = cephes.jv(n, x);
```

#### double = cephes.y0(x: double)

`y0` is the "Bessel, second kind, order 0". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#y0.

```js
const ret = cephes.y0(x);
```

#### double = cephes.y1(x: double)

`y1` is the "Bessel, second kind, order 1". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#y1.

```js
const ret = cephes.y1(x);
```

#### double = cephes.yn(n: int, x: double)

`yn` is the "Bessel, second kind, order n". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#yn.

```js
const ret = cephes.yn(n, x);
```

#### double = cephes.yv(v: double, x: double)

`yv` is the "Bessel, noninteger order". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#yv.

```js
const ret = cephes.yv(v, x);
```

#### double = cephes.i0(x: double)

`i0` is the "Modified Bessel, order 0". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#i0.

```js
const ret = cephes.i0(x);
```

#### double = cephes.i0e(x: double)

`i0e` is the "Exponentially scaled i0". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#i0e.

```js
const ret = cephes.i0e(x);
```

#### double = cephes.i1(x: double)

`i1` is the "Modified Bessel, order 1". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#i1.

```js
const ret = cephes.i1(x);
```

#### double = cephes.i1e(x: double)

`i1e` is the "Exponentially scaled i1". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#i1e.

```js
const ret = cephes.i1e(x);
```

#### double = cephes.iv(v: double, x: double)

`iv` is the "Modified Bessel, nonint. order". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#iv.

```js
const ret = cephes.iv(v, x);
```

#### double = cephes.k0(x: double)

`k0` is the "Mod. Bessel, 3rd kind, order 0". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#k0.

```js
const ret = cephes.k0(x);
```

#### double = cephes.k0e(x: double)

`k0e` is the "Exponentially scaled k0". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#k0e.

```js
const ret = cephes.k0e(x);
```

#### double = cephes.k1(x: double)

`k1` is the "Mod. Bessel, 3rd kind, order 1". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#k1.

```js
const ret = cephes.k1(x);
```

#### double = cephes.k1e(x: double)

`k1e` is the "Exponentially scaled k1". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#k1e.

```js
const ret = cephes.k1e(x);
```

#### double = cephes.kn(nn: int, x: double)

`kn` is the "Mod. Bessel, 3rd kind, order n". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#kn.

```js
const ret = cephes.kn(nn, x);
```

### Hypergeometric

#### double = cephes.hyperg(a: double, b: double, x: double)

`hyperg` is the "Confluent hypergeometric". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#hyperg.

```js
const ret = cephes.hyperg(a, b, x);
```

#### double = cephes.hyp2f1(a: double, b: double, c: double, x: double)

`hyp2f1` is the "Gauss hypergeometric function". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#hyp2f1.

```js
const ret = cephes.hyp2f1(a, b, c, x);
```

### Elliptic

#### double = cephes.ellpe(x: double)

`ellpe` is the "Complete elliptic integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#ellpe.

```js
const ret = cephes.ellpe(x);
```

#### double = cephes.ellie(phi: double, m: double)

`ellie` is the "Incomplete elliptic integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#ellie.

```js
const ret = cephes.ellie(phi, m);
```

#### double = cephes.ellpk(x: double)

`ellpk` is the "Complete elliptic integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#ellpk.

```js
const ret = cephes.ellpk(x);
```

#### double = cephes.ellik(phi: double, m: double)

`ellik` is the "Incomplete elliptic integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#ellik.

```js
const ret = cephes.ellik(phi, m);
```

#### [int, extra] = cephes.ellpj(u: double, m: double)

`ellpj` is the "Jacobian elliptic function". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#ellpj.

```js
const [ret, extra] = cephes.ellpj(u, m);
```

The `extra` object contains the following values: 

```js
const {
  sn: double,
  cn: double,
  dn: double,
  ph: double
} = extra;
```

### Probability

#### double = cephes.btdtr(a: double, b: double, x: double)

`btdtr` is the "Beta distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#btdtr.

```js
const ret = cephes.btdtr(a, b, x);
```

#### double = cephes.smirnov(n: int, e: double)

`smirnov` is the "Exact Smirnov statistic, for one-sided test.". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#smirnov.

```js
const ret = cephes.smirnov(n, e);
```

#### double = cephes.kolmogorov(y: double)

`kolmogorov` is the "Kolmogorov's limiting distribution of two-sided test.". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#kolmogorov.

```js
const ret = cephes.kolmogorov(y);
```

#### double = cephes.smirnovi(n: int, p: double)

`smirnovi` is the "Functional inverse of Smirnov distribution.". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#smirnovi.

```js
const ret = cephes.smirnovi(n, p);
```

#### double = cephes.kolmogi(p: double)

`kolmogi` is the "Functional inverse of Kolmogorov statistic for two-sided test.". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#kolmogi.

```js
const ret = cephes.kolmogi(p);
```

#### double = cephes.nbdtri(k: int, n: int, p: double)

`nbdtri` is the "Inverse Negative binomial distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#nbdtri.

```js
const ret = cephes.nbdtri(k, n, p);
```

#### double = cephes.stdtri(k: int, p: double)

`stdtri` is the "Functional inverse of Student's t distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#stdtri.

```js
const ret = cephes.stdtri(k, p);
```

#### double = cephes.bdtr(k: int, n: int, p: double)

`bdtr` is the "Binomial distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#bdtr.

```js
const ret = cephes.bdtr(k, n, p);
```

#### double = cephes.bdtrc(k: int, n: int, p: double)

`bdtrc` is the "Complemented binomial". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#bdtrc.

```js
const ret = cephes.bdtrc(k, n, p);
```

#### double = cephes.bdtri(k: int, n: int, y: double)

`bdtri` is the "Inverse binomial". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#bdtri.

```js
const ret = cephes.bdtri(k, n, y);
```

#### double = cephes.chdtr(df: double, x: double)

`chdtr` is the "Chi square distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#chdtr.

```js
const ret = cephes.chdtr(df, x);
```

#### double = cephes.chdtrc(df: double, x: double)

`chdtrc` is the "Complemented Chi square". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#chdtrc.

```js
const ret = cephes.chdtrc(df, x);
```

#### double = cephes.chdtri(df: double, y: double)

`chdtri` is the "Inverse Chi square". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#chdtri.

```js
const ret = cephes.chdtri(df, y);
```

#### double = cephes.fdtr(ia: int, ib: int, x: double)

`fdtr` is the "F distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#fdtr.

```js
const ret = cephes.fdtr(ia, ib, x);
```

#### double = cephes.fdtrc(ia: int, ib: int, x: double)

`fdtrc` is the "Complemented F". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#fdtrc.

```js
const ret = cephes.fdtrc(ia, ib, x);
```

#### double = cephes.fdtri(ia: int, ib: int, y: double)

`fdtri` is the "Inverse F distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#fdtri.

```js
const ret = cephes.fdtri(ia, ib, y);
```

#### double = cephes.gdtr(a: double, b: double, x: double)

`gdtr` is the "Gamma distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#gdtr.

```js
const ret = cephes.gdtr(a, b, x);
```

#### double = cephes.gdtrc(a: double, b: double, x: double)

`gdtrc` is the "Complemented gamma". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#gdtrc.

```js
const ret = cephes.gdtrc(a, b, x);
```

#### double = cephes.nbdtr(k: int, n: int, p: double)

`nbdtr` is the "Negative binomial distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#nbdtr.

```js
const ret = cephes.nbdtr(k, n, p);
```

#### double = cephes.nbdtrc(k: int, n: int, p: double)

`nbdtrc` is the "Complemented negative binomial". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#nbdtrc.

```js
const ret = cephes.nbdtrc(k, n, p);
```

#### double = cephes.ndtr(a: double)

`ndtr` is the "Normal distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#ndtr.

```js
const ret = cephes.ndtr(a);
```

#### double = cephes.ndtri(y0: double)

`ndtri` is the "Inverse normal distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#ndtri.

```js
const ret = cephes.ndtri(y0);
```

#### double = cephes.pdtr(k: int, m: double)

`pdtr` is the "Poisson distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#pdtr.

```js
const ret = cephes.pdtr(k, m);
```

#### double = cephes.pdtrc(k: int, m: double)

`pdtrc` is the "Complemented Poisson". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#pdtrc.

```js
const ret = cephes.pdtrc(k, m);
```

#### double = cephes.pdtri(k: int, y: double)

`pdtri` is the "Inverse Poisson distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#pdtri.

```js
const ret = cephes.pdtri(k, y);
```

#### double = cephes.stdtr(k: int, t: double)

`stdtr` is the "Student's t distribution". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#stdtr.

```js
const ret = cephes.stdtr(k, t);
```

### Miscellaneous

#### double = cephes.plancki(w: double, T: double)

`plancki` is the "Integral of Planck's black body radiation formula". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#plancki.

```js
const ret = cephes.plancki(w, T);
```

#### double = cephes.planckc(w: double, T: double)

`planckc` is the "Complemented Planck radiation integral". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#planckc.

```js
const ret = cephes.planckc(w, T);
```

#### double = cephes.planckd(w: double, T: double)

`planckd` is the "Planck's black body radiation formula". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#planckd.

```js
const ret = cephes.planckd(w, T);
```

#### double = cephes.planckw(T: double)

`planckw` is the "Wavelength, w, of maximum radiation at given temperature T.". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#planckw.

```js
const ret = cephes.planckw(T);
```

#### double = cephes.spence(x: double)

`spence` is the "Dilogarithm". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#spence.

```js
const ret = cephes.spence(x);
```

#### double = cephes.zetac(x: double)

`zetac` is the "Riemann Zeta function". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#zetac.

```js
const ret = cephes.zetac(x);
```

#### double = cephes.zeta(x: double, q: double)

`zeta` is the "Two argument zeta function". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#zeta.

```js
const ret = cephes.zeta(x, q);
```

#### double = cephes.struve(v: double, x: double)

`struve` is the "Struve function". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#struve.

```js
const ret = cephes.struve(v, x);
```

### Polynomials and Power Series

#### double = cephes.p1evl(x: double, coef: Float64Array, N: int)

`p1evl` is the "Evaluate polynomial when coefficient of x is 1.0.". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#p1evl.

```js
const ret = cephes.p1evl(x, new Float64Array(coef), N);
```

#### double = cephes.polylog(n: int, x: double)

`polylog` is the "The polylogarithm of order n". You can read the full documentation at http://www.netlib.org/cephes/doubldoc.html#polylog.

```js
const ret = cephes.polylog(n, x);
```


## LICENSE

The cephes library, that this module wraps, can be found at
http://www.netlib.org/cephes/. The cephes library from the NetLib website,
doesn't have any license. However, the author Stephen Moshier, has kindly given
permission for it to be included in a BSD-licensed package.

Please see the [LICENSE](LICENSE) file, for all the details.
