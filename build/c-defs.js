
// The real functions are defined in cephes.js, this is just so
// emscripten doesn't complain.
mergeInto(LibraryManager.library, {
  mtherr: function(name /* char* */, code /* int */) {
    throw new Error(name);
  }
});
