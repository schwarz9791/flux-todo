import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const src  = path.resolve(__dirname, `src`)
const dist = path.resolve(__dirname, 'dist')

export default {
  mode: 'development',
  entry: src + '/index.jsx',

  output: {
    path: dist,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: src + '/index.html',
      filename: 'index.html'
    })
  ]
}
