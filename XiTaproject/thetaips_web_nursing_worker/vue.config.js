const webpack = require('webpack');
module.exports = {
    // publicPath: '/nursingpage',
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.135:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/cc': {
                target: 'http://192.168.1.152:8089',
                changeOrigin: true,
                pathRewrite: {
                    '^/cc': ''
                }
            }
        }
    },
    // configureWebpack: { //引入jquery
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             $: "jquery",
    //             jQuery: "jquery",
    //             "windows.jQuery": "jquery"
    //         })
    //     ]
    // },

}