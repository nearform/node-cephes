# Contributing

We love to get pull requests, but please restrict it to be directly related
to the cephes library from http://www.netlib.org/cephes/.

## Dependencies

To compile `node-cephes` you must have the following installed:

* `clang-format`: https://github.com/angular/clang-format#readme
* `clang-tools-prebuilt`: https://github.com/hokein/clang-tools-prebuilt
* `cproto`: http://cproto.sourceforge.net/, on MacOS `brew install cproto` will work fine.
* `emscripten`: http://emscripten.org/, see install instructions here: http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html
* The package dev-dependencies, use `npm install`

## Download Cephes Library

To re-download the cephes library run:

```
make download
```

## Compile

To compile:

```
make build
```
