const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssNano = require('cssnano');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin')

const JS_DIR = path.resolve( __dirname, 'src/js');
const SCSS_DIR = path.resolve( __dirname, 'src/scss');
const IMG_DIR = path.resolve( __dirname, 'src/img');
const BUILD_DIR = path.resolve( __dirname, 'build');

const entry = {
    main: JS_DIR + '/main.js',
    editor: JS_DIR + '/editor.js',
    slick: JS_DIR + '/slick.js'
};

const output = {
    path: BUILD_DIR,
    filename: 'js/[name].js'
};

const rules = [
    {
        test: /\.js$/,
        include: [JS_DIR],
        exclude: /node_modules/,
        use: 'babel-loader'
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader, // The CSS is imported in the main.js file but this extracts it and puts it in it's own css folder
            'css-loader',
            'sass-loader',
        ]
    },
    {
        test: /\.(png|jpg|svg|jpeg|gif|ico)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
                publicPath: process.env.NODE_ENV === 'production' ? '../' : '../../'
            }
        }
    },
    { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        use: {
            loader: 'url-loader?limit=100000'
        }
    }
]

const plugins = (argv) => [
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: (argv.mode === 'production')
    }),

    new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    }),

    new DependencyExtractionWebpackPlugin({
        injectPolyfill: true,
        combineAssets: true
    })
]

module.exports = (env, argv) => ({
    entry,
    output,
    devtool: 'source-map',
    module: {
        rules
    },
    plugins: plugins(argv), // For the node environment
    externals: {
        jquery: 'jQuery'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessor: cssNano
            }),
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                sourceMap: false
            })
        ]
    }
});