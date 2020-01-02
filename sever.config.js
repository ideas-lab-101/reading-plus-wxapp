
const Environment = 'product'

/**
 * 数据服务器
 * @type {string}
 */
const host = Environment === 'development'? "http://dev.linestorm.ltd" : "http://looker.linestorm.ltd"

/**
 * 上传文件服务器
 * @type {string}
 */
const uploadHost= Environment === 'development'? "https://m.dev.cdqidi.cn" : "https://m.cdqidi.cn"

/**
 * 支付
 * @type {string}
 */
const payUrl = Environment === 'development'? "https://m.dev.cdqidi.cn" : "https://m.cdqidi.cn"

/**
 * 图片服务器
 * @type {string}
 */
const resourseUrl = 'https://staticsource.cdqidi.cn/'

module.exports = {
    Environment,
    host,
    uploadHost,
    resourseUrl
}