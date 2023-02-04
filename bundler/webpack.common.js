const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { loader } = require('mini-css-extract-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: path.resolve(__dirname, '../src/script.js'),
  output:
  {
      filename: 'bundle.[contenthash].js',
      path: path.resolve(__dirname, '../dist')
  },
  optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
          cacheGroups: {
              vendor: {
                  test: /node_modules/,
                  name: "vendors",
                  chunks: "all",
                  enforce: true
              }
          }
      }
  },
  devtool: 'source-map',
  plugins: [
      // new BundleAnalyzerPlugin(),
      new CopyWebpackPlugin({
          patterns: [
              {
                  from: path.resolve(__dirname, '../static/'),
                  globOptions: {
                      dot: true,
                      gitignore: true,
                      ignore: ["**/img/**", "**/fonts/**"],
                  },
              }
          ]
      }),
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '../src/index.html'),
          minify: true
      }),
      new MiniCSSExtractPlugin()
  ],
  module:
  {
      rules:
      [
          // HTML
          {
              test: /\.html$/,
              use: {
                  loader: 'html-loader',
                  options: {
                      attributes: {
                          list: [
                              {
                                  tag: "img",
                                  attribute: "data-src",
                                  type: "src"
                              },
                              {
                                  tag: "img",
                                  attribute: "data-srcset",
                                  type: "srcset"
                              },
                          ],
                      }
                  },
              },
          },

          // JS
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use:
              [
                  'babel-loader'
                  ]
          },

          // CSS
          {
              test: /\.css$/,
              use:
              [
                  MiniCSSExtractPlugin.loader,
                  'css-loader'
              ]
          },

          // Images
          {
              test: /\.(jp?g|png|svg)$/,
              use:
              [
                  {
                      loader: 'file-loader',
                      options:
                      {
                        outputPath: 'assets/images/'
                      }
                  }
              ]
          },

          // Fonts
          {
            test: /\.(ttf|otf|eot|woff|woff2)$/,
            // type: 'asset/resource',
            use:
            [{
              loader: 'file-loader',
              options:
              {
                name: '[name].[ext]',
                outputPath: 'assets/fonts/'
              }
            }]
          },

          // GLSL
          {
              test: /\.(glsl|vs|fs|vert|frag)$/,
              exclude: /node_modules/,
              use:
              [
                  'raw-loader',
                  'glslify-loader'
              ]
          }
      ]
  }
}
