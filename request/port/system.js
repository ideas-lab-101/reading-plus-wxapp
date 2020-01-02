const { fetch } = require('../fetch')

/**
 * 登录接口
 *code userInfo
 */
export function wxaLogin(data) {
    return fetch({
        url: '/wxapp/system/wxaLogin',
        data: data || {},
        method: 'POST'
    })
}

/**
 * 登陆检查接口（更新登陆状态）
 *code
 */
export function checkLogin(data) {
    return fetch({
        url: '/wxapp/system/checkLogin',
        data: data || {},
        method: 'POST'
    })
}


/**
 * 获取微信加密信息（电话）
 *session_key encryptedData iv
 */
export function getWxaInfo(data) {
    return fetch({
        url: '/wxapp/system/getWxaInfo',
        data: data || {},
        method: 'POST'
    })
}


/**
 * 获得微信二维码
 */
export function getWXSSCode(data) {
    return fetch({
        url: '/wxapp/system/getWXSSCode',
        data: data || {},
        method: 'GET'
    })
}

/**
 * 获得七牛上传凭证
 */
export function getUploadToken(data) {
    return fetch({
        url: '/wxapp/system/getUploadToken',
        data: data || {},
        method: 'GET'
    })
}