import path from 'path'

module.exports = {
  devtool: 'source-map',
  entry: {
    'http/get-greeting': './src/http/get-greeting.ts',
  },
  externals: ['aws-sdk'],
  mode: 'production',
  module: {
    rules: [
      {
        loader: 'ts-loader',
        options: { transpileOnly: true },
        test: /\.tsx?$/,
      },
    ],
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  output: {
    filename: '[name]/index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    modules: ['node_modules'],
  },
  target: 'node',
}
