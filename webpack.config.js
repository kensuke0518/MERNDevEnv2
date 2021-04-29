const HWP = require('html-webpack-plugin');
const path = require('path');

const hwp = new HWP({
    template: "./src/html/index.html",
    filename:"./index.html"
})

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve('docs'),
        filename:'[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins: [hwp]
}