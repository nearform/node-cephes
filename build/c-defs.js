
mergeInto(LibraryManager.library, {
  isfinite: function(x /* double */) {
    return Number.isFinite(x) | 0;
  },
  isnan: function(x /* double */) {
    return Number.isNaN(x) | 0;
  },
  mtherr: function(name /* char* */, code /* int */) {
    // from mtherr.c
    /*
     *    DOMAIN            1       argument domain error
     *    SING              2       function singularity
     *    OVERFLOW          3       overflow range error
     *    UNDERFLOW         4       underflow range error
     *    TLOSS             5       total loss of precision
     *    PLOSS             6       partial loss of precision
     *    EDOM             33       Unix domain error code
     *    ERANGE           34       Unix range error code
    */

    const mtherr_codemsg = new Map([
      [0, 'unknown error'],
      [1, 'argument domain error'],
      [2, 'function singularity'],
      [3, 'overflow range error'],
      [4, 'underflow range error'],
      [5, 'total loss of precision'],
      [6, 'partial loss of precision'],
      [33, 'Unix domain error code'],
      [34, 'Unix range error code']
    ]);

    const fnname = AsciiToString(name);
    const codemsg = mtherr_codemsg.get(code);
    const message = 'cephes reports "' + codemsg + '" in ' + fnname;
    if (code == 1) {
      throw new RangeError(message);
    } else {
      throw new Error(message);
    }
  }
});
