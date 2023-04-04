module.exports = {
    devServer: {
        proxy: {
            '^/geoserver': {
                target: 'http://192.168.0.86:8080/',
                changeOrigin: true
            },
        }
    }
}

