module.exports = {
    devServer: {
        proxy: {
            [process.env.VUE_APP_API_URL_PREFIX]: {
                target:  'http://10.168.1.21/eolinker4.0/server/index.php?g=Web&c=Mock&o=simple&projectID=28&uri=',
                pathRewrite: {
                    ['^'+process.env.VUE_APP_API_URL_PREFIX]: 'http://10.168.1.21/eolinker4.0/server/index.php?g=Web&c=Mock&o=simple&projectID=28&uri='
                }
            }
        }
    }
}