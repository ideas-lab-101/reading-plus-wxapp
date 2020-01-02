const { fetch } = require('../fetch')

/**
 * 支付购买
 *token out_trade_no total_fee
 */
export function orderPay(data) {
    return new Promise( (resolve, reject) => {
        fetch({
            url: '/wxapp/order/orderPay',
            data: data || {},
            method: 'POST'
        }, { title: '正在支付...'})
            .then(res => {

                wxPay(res.data)
                    .then(res => {
                        resolve(res)
                    }, ret => {
                        reject(ret)
                    })
                return res
            })
    })
}

export function wxPay(data) {
    return new Promise( (resolve, reject) => {
        wx.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': (response) => {
                console.log('支付完成：', response)
                resolve(response)
            },
            'fail': (response) => {
                wx.showToast({title: '支付失败', icon: 'none'})
                reject(response)
            }
        })
    })
}