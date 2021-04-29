const { merge } = require('webpack-merge');
const path = require('path');
const webpackConfig = require('./webpack.config.js');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'docs'),
        historyApiFallback: true,
        inline: true,
        open: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            }
        },
    }
})
