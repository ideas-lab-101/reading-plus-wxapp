const { fetch } = require('../fetch')

/**
 * 获取券信息（训练券、检查券）
 *coupon_type(11-训练券；22-检查券)
 */
export function getCouponInfo(data) {
    return fetch({
        url: '/wxapp/coupon/getCouponInfo',
        data: data || {},
        method: 'GET'
    })
}

/**
 * 获取券列表（训练券、检查券）
 */
export function getCouponList(data) {
    return fetch({
        url: '/wxapp/coupon/getCouponList',
        data: data || {},
        method: 'GET'
    })
}

/**
 * 获取券信息（训练券、检查券）
 *token coupon_type redeem_code（兑换码，可选）
 */
export function getCoupon(data) {
    return fetch({
        url: '/wxapp/coupon/getCoupon',
        data: data || {},
        method: 'POST'
    })
}

