const ProxyUrl = 'http://172.31.254.44:8081'
module.exports = {
    publicPath: './',
    lintOnSave: false,
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/packages/theme-style/same.scss";`
            },
        }
    },
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/test':  {
                target: ProxyUrl
            },
        },
        port: 9004,
        https: true
    },
    productionSourceMap: false
}
