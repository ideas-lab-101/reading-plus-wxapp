const { fetch } = require('../fetch')

/**
 * 获取首页swipper
 */
export function getIndex(data) {
    return fetch({
        url: '/wxapp/main/index',
        data: data || {},
        method: 'GET'
    })
}

/**
 * 获取门店列表
 * page pageSize(可选) coordinate(当前位置)
 */
export function getStoreList(data) {
    return fetch({
        url: '/wxapp/main/getStoreList',
        data: data || {},
        method: 'GET'
    })
}

/**
 * 获取门店信息
 * store_id
 */
export function getStoreInfo(data) {
    return fetch({
        url: '/wxapp/main/getStoreInfo',
        data: data || {},
        method: 'GET'
    })
}
