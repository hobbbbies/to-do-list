const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
    app: './src/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};