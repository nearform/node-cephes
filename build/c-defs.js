
// The real functions are defined in cephes.js, this is just so
// emscripten doesn't complain.
mergeInto(LibraryManager.library, {
  __errno_location: function (pointer) {
    return pointer;
  },
  mtherr: function(name /* char* */, code /* int */) {
    throw new Error(name);
  }
});
