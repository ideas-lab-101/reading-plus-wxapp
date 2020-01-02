import Toast from "../viewMethod/toast";

var requestTask = []		// 请求task
var requestSeq = 0			// 请求id
var requestingNum = 0    // 正在执行的请求数


const BasicUrl = require('../sever.config')
const constants = require('./constants')

const noop = function noop() {};

const RequestError = (function () {
  function RequestError(code, message) {
    Error.call(this, message);
    this.code = code;
    this.msg = message;
  }

  RequestError.prototype = new Error();
  RequestError.prototype.constructor = RequestError;

  return RequestError;
})();


/**
 * [request 封装request请求]
 * @param {options}
 *   url: 请求接口url
 *   data: 请求参数
 *   success: 成功回调
 *   fail: 失败回调
 *   complete: 完成回调
 */

var error;
var message;

const interceptors = function (options) {
  /**
   *  拦截登录部分的请求接口  这部分不拦截
   * @type {string[]}
   */
  const loginRequestPort = ['authByCode', 'bindUser', 'sendVerificationCode', 'getSchOrClsInfo', 'existsByMobile', 'updatePersonTypeAndSchId', 'getUserInfoByMobile', 'updateUserInfo', 'getStuByClsIdAndStuName', 'unbind', 'getUserInfo']
  const result = loginRequestPort.some(item => {
    return options.url.includes(item)
  })
  return result
}


const request = function (options = {}, loading) {

   /* if (interceptors(options)) {
      return false
    }*/

    if (typeof options !== 'object') {
      const message = '请求传参应为 object 类型，但实际传了 ' + (typeof options) + ' 类型';
      throw new RequestError(constants.ERR_INVALID_PARAMS, message);
    }

    if(!BasicUrl.host) {
      const message = '请求服务器域名为空，请配置成你的服务器域名';
      throw new RequestError(constants.ERR_INVALID_PARAMS, message);
    }

    if (Object.keys(loading).length > 0) {
      wx.showLoading({
        title: loading.title || `数据加载中`,
        mask: loading.mask || false
      })
    }

    const success = options.success || noop;
    const fail = options.fail || noop;
    const complete = options.complete || noop;

    const url = BasicUrl.host + options.url + (options.params?('?' + formatParams(options.params)) : '')
    const data = options.data || ''
    const method = options.method ? options.method.toUpperCase() : 'GET';

    const ContentHeader = (options.method && options.method.toUpperCase() ==='POST') ? {'content-type': 'application/x-www-form-urlencoded'}:{'content-type': 'application/json'}
    const header =  Object.assign({}, options.header, ContentHeader)

    /**
     * 并发请求计数
     */
    requestingNum++

    requestTask[requestSeq++] = wx.request({ url, data, method, header, dataType: 'json',
        success: function(response) {
          const responseData = response.data
          /**
           * 统一在开发环境打印数据
           */
          //if(BasicUrl.Environment === 'development') {
            console.log(url, '---请求接口数据：', responseData)
          //}

          if (Object.keys(loading).length > 0) {
            wx.hideLoading()
          }

          if (response.errMsg === 'request:ok') {

              if(responseData.code === constants.REQUEST_SUCCESS) {

                /**
                 * 请求管理器 里面添加新增的调用成功接口
                 */
                if(method === 'POST') {
                  const FormatData = data
                  getApp().requestManager.add({
                    expire: new Date().getTime() + 60*60*1000 + requestSeq,
                    url: url,
                    type: FormatData.hasOwnProperty('type') ? FormatData.type : ''
                  })
                }

                /**
                 * 1 请求成功
                 */
                success(responseData)

              }else if(responseData.code === constants.ERR_INVALID_SESSION) {
                /**
                 * 6  登录状态过期
                 */
                message = 'token失效发生错误' + (responseData.msg || '未知错误');
                error = new RequestError(constants.ERR_INVALID_SESSION, message);

                fail(error)
              }else if(responseData.code === constants.ERR_INVALID_DATA) {
                /**
                 * 3  无效的数据,但是页面会做相应的变化
                 */

                FailToast(constants.ERR_INVALID_DATA, responseData)
                fail(error)

              }else if(responseData.code === constants.REQUEST_FAIL) {
                /**
                 * 0  未知错误
                 */

                FailToast(constants.REQUEST_FAIL, responseData)
                fail(error)

              }else if(responseData.code === constants.ERR_REFRESH_DATA) {
                /**
                 * 请求管理器 里面添加新增的调用成功接口
                 */
                if(method === 'POST') {
                  const FormatData = data
                  getApp().requestManager.add({
                    expire: new Date().getTime() + 60*60*1000 + requestSeq,
                    url: url,
                    type: FormatData.hasOwnProperty('type') ? FormatData.type : ''
                  })
                }
                /**
                 * 5  返回的结果也是正确的   并且要执行页面刷新
                 */
                FailToast(constants.ERR_REFRESH_DATA, responseData)
                fail(error)

              }else {
                /**
                 *  其他错误
                 */
                FailToast(constants.ERR_UNCERTAINTY_DATA, responseData)
                fail(error)
              }

              return false
          }

          fail(responseData)
        },

        fail: function (err) {
          if (Object.keys(loading).length > 0) {
            wx.hideLoading()
          }
          fail(err)
        },
        complete: function () {
          requestingNum--
          complete()
        }
    })
}



const FailToast = function (errorType, responseData) {
  /**
   * 错误处理
   * @type {*|string}
   */
  message = responseData.msg || '未知错误';
  error = new RequestError(errorType, message);

  Toast.text({ text: message})
}

/**
 * 把对象组装成URL 参数
 * @param data
 * @returns {string}
 */
const formatParams = function (data) {
    var arr = []
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]))
    }
    return arr.join("&")
}


const getFName = function (fn){
    return (/^[\s\(]*function(?:\s+([\w$_][\w\d$_]*))?\(/).exec(fn.toString())[1] || ''
}

module.exports = {
  request,
  requestTask,
  requestSeq,
  RequestError: RequestError
}
