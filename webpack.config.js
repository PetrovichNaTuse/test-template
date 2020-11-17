const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        app: './js/entries/app.js',
        // vendor: './src/js/entries/vendor.js',
        // 'template-vendor': [
        //     '../../../../common/assets/unify',
        //     '../../../../common/assets/custom'
        // ]
    },
    output: {
        // path: path.resolve(__dirname, '../../../web/profile/'),
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        // publicPath: '/profile/js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                options: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin()
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src/js'),
            'node_modules'
        ]
    },
};
