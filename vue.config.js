module.exports = {
  configureWebpack: {
    externals: {
      './cptable': 'var cptable',
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  outputDir: 'dist',
  indexPath: 'index.html',
};
