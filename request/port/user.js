const { fetch } = require('../fetch')

/**
 * 增加视觉档案
 *token d1 d2
 */
export function editEyeAccount(data) {
    return fetch({
        url: '/wxapp/user/editEyeAccount',
        data: data || {},
        method: 'POST'
    })
}

/**
 * 获得视觉档案
 *token
 */
export function getEyeAccount(data) {
    return fetch({
        url: '/wxapp/user/getEyeAccount',
        data: data || {},
        method: 'GET'
    })
}


/**
 * 获取微信加密信息（电话）
 *session_key encryptedData iv
 */
export function getWxaInfo(data) {
    return fetch({
        url: '/wxapp/user/getWxaInfo',
        data: data || {},
        method: 'GET'
    })
}


/**
 * 获取个人券
 *token
 */
export function userCouponList(data) {
    return fetch({
        url: '/wxapp/user/userCouponList',
        data: data || {},
        method: 'GET'
    })
}

/**
 * 获取个人训练记录
 *token page pageSize(可选)
 */
export function userTrainList(data) {
    return fetch({
        url: '/wxapp/user/userTrainList',
        data: data || {},
        method: 'GET'
    })
}