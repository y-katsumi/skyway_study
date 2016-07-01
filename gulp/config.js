var dest = './www'; // 出力先ディレクトリ
var src = './src';  // ソースディレクトリ

module.exports = {
  // 出力先の指定
  dest: dest,
  src: src,

  // jsのビルド設定
  js: {
    dest: dest + '/js/',
    uglify: false
  },

  // webpackの設定
  // やろうかと思ったけど断念
  webpack: {
    entry: src + '/js/app.js',
    output: {
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js']
    },
    // module: {
    //     loaders: [
    //         { test: /\.js$/, loader: 'es6-loader' },
    //     ]
    // },
  }
}
