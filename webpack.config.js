// references:
// https://www.toptal.com/react/webpack-react-tutorial-pt-1
// https://www.toptal.com/react/webpack-config-tutorial-pt-2

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const dotenv = require('dotenv')
//Extracts loaded styles into separate files for production use to take advantage of browser caching.
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function parseEnv(isProduction) {
  try {
    let env = {}

    if (fs.existsSync('.env')) {
      const envConfig = dotenv.parse(fs.readFileSync('.env'))

      env = {
        ...env,
        ...envConfig,
      }
    }

    if (!isProduction && fs.existsSync('.env.development')) {
      const envConfig = dotenv.parse(fs.readFileSync('.env.development'))

      env = {
        ...env,
        ...envConfig,
      }
    } else if (isProduction && fs.existsSync('.env.production')) {
      const envConfig = dotenv.parse(fs.readFileSync('.env.production'))

      env = {
        ...env,
        ...envConfig,
      }
    }

    return env
  } catch (err) {
    console.error(err)
  }
}

module.exports = function(_env, argv) {
  const isProduction = argv.mode === 'production'
  const isDevelopment = !isProduction
  const env = parseEnv(isProduction)

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  return {
    devtool: isDevelopment && 'cheap-module-source-map', // Enables source-map generation in development mode.
    entry: './src/index.js', // The main file of our React application.
    output: {
      path: path.resolve(__dirname, 'build'), // The root directory to store output files in.
      filename: 'assets/js/[name].[contenthash:8].js', // The filename pattern to use for generated files.
      publicPath: '/', // The path to the root directory where the files will be deployed on the web server.
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? 'production' : 'development',
            },
          },
        },
        {
          test: /\.css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2|mp3)$/,
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name].[contenthash:8].css',
          chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
        }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        inject: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        ...envKeys,
      }),
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          },
        }),
        new OptimizeCssAssetsPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `${cacheGroupKey}.${packageName.replace('@', '')}`
            },
          },
          common: {
            minChunks: 2,
            priority: -10,
          },
        },
      },
      runtimeChunk: 'single',
    },
    devServer: {
      compress: true, // Enables asset compression for faster reloads.
      historyApiFallback: true, // Enables a fallback to index.html for history-based routing.
      open: true, // Opens the browser after launching the dev server.
      overlay: true, // Displays Webpack errors in the browser window.
      port: env.PORT
    },
  }
}
