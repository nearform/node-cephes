# Contributing

We love to get pull requests, but please restrict it to be directly related
to the cephes library from <http://www.netlib.org/cephes/>.

## Dependencies

To compile `node-cephes` you must have the following installed:

* `clang-format`: <https://github.com/angular/clang-format#readme>
* `cproto`: <http://cproto.sourceforge.net/>, on MacOS `brew install cproto` will work fine.
* `emscripten`: <http://emscripten.org/>, see install instructions here: <http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html>
* The package dev-dependencies, use `npm install`

## Download Cephes Library

To re-download the cephes library run:

```shell
make download
```

## Compile

To compile:

```shell
make clean && make build
```

## To build the test-suite

To autogenerate the [test-suite](./test/expected.json), you will also need a C-compiler on your system.

```shell
make test-suite
```

## Preview

You can also preview the output by serving the article (after install).

```shell
npm run serve:article
```
