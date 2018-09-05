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
