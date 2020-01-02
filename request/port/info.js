const { fetch } = require('../fetch')

/**
 * 获取页面内容
 * info_id
 */
export function getInfoContent(data) {
    return fetch({
        url: '/wxapp/info/getInfoContent',
        data: data || {},
        method: 'GET'
    })
}