const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "util": require.resolve("util/"),
          "buffer": require.resolve("buffer/"),
          "zlib": require.resolve("browserify-zlib"),
          "crypto": require.resolve("crypto-browserify"),
          "timers": require.resolve("timers-browserify"),
          "stream": require.resolve("stream-browserify"),
          "process": require.resolve("process/browser")
        },
        alias: {
          'process/browser': require.resolve('process/browser')
        }
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser'
        })
      ]
    }
  }
}; 