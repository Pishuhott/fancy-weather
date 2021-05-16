const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', 'png', 'jpg', 'gif', 'svg'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'assets'),
            '@images': path.resolve(__dirname, 'assets/images'),
            '@scripts': path.resolve(__dirname, 'src/scripts'),
            '@styles': path.resolve(__dirname, 'src/styles'),
          },
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Weather',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg)$/,
                use : ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/
            }
        ]
    }
}
