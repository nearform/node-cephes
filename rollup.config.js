module.exports = {
  plugins: [
    require('rollup-plugin-commonjs')(),
    require('rollup-plugin-node-resolve')({
      // Avoid https://github.com/rollup/rollup-plugin-node-resolve/issues/196
      preferBuiltins: true
    }),
    require('rollup-plugin-browserify-transform')(
      require('brfs'),
      {
        parserOpts: {
          sourceType: 'module'
        }
      }
    ),
    require('rollup-plugin-remap')({
      originalPath: './cephes.js',
      targetPath: './cephes-browser.js'
    })
  ]
};
