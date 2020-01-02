const constants = require('../utils/constants')
/**
 * 继承finally
 * @param callback
 * @returns {Promise<any | never>}
 */
Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}

/**
 * 请求统一调用方法
 * @param options
 * @param loading
 * @returns {*}
 */

let isSubmiting = false
let requestTokenNum = 0     // 重新请求次数

export const fetch = function (options, loading = {}) {
  if(arguments.length <= 0 ) {
    return false
  }

  
  /**
   * 常用参数放进header里面
   * @type {any}
   */
  const header = options.header
  const url = options.url
  const method = options.method ? options.method.toUpperCase() : 'GET'
  options.data = Object.assign({ token: getApp().user.authToken }, options.data)
  
  /***
   * 锁定所有的POST请求 如果执行完成了 才能执行
   */
  if(method === 'POST') {
    if (isSubmiting) {
      return new Promise((resolve, reject) => { reject(false) })
    }
    isSubmiting = true
  }

  const promptly = new Promise( (resolve, reject) => {

      getApp().request.request({ url, data: options.data, header, method,
        success: (response) => {
          if(method === 'POST') {
            isSubmiting = false
          }
          requestTokenNum = 0
          resolve(response)
        },
        fail: (ret) => {
          if(method === 'POST') {
            isSubmiting = false
          }
          reject(ret)
        },
        complete: () => {
          /**
           * 解锁请求
           * @type {boolean}
           */
          if(method === 'POST') {
            isSubmiting = false
          }
        }
      }, loading)

    })
      .catch(ret => {
        if(method === 'POST') {
          isSubmiting = false
        }
        /**
         * 重新拉取 发起的请求数
         * 重新拉取token 再重新发起请求拉数据 如果连续错误会反复拉取5次
         */
        if(ret.code === constants.ERR_INVALID_SESSION && requestTokenNum < 6) {
          requestTokenNum++
          return getApp().user.checkLogin()
            .then((token) => {
              options.data['token'] = token
              return  fetch(options, loading)
            })
        }

        throw ret
      })

      .finally(() => {
        if(method === 'POST') {
          isSubmiting = false
        }
        return true
      })

  return promptly
}
