const { fetch } = require('../fetch')

/**
 * 检查账户接口（是否有视觉档案，是否有体验券）
 *token
 */
export function checkAccount(data) {
    return fetch({
        url: '/wxapp/train/checkAccount',
        data: data || {},
        method: 'GET'
    })
}

/**
 * 开始训练
 *token coordinate
 */
export function doTrain(data) {
    return fetch({
        url: '/wxapp/train/doTrain',
        data: data || {},
        method: 'POST'
    })
}


/**
 * 训练反馈
 *token train_id rank(1-5) feedback
 */
export function trainFeedback(data) {
    return fetch({
        url: '/wxapp/train/trainFeedback',
        data: data || {},
        method: 'POST'
    })
}