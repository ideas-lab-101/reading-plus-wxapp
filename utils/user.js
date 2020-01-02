const Session = require('./session')
import { wxaLogin, checkLogin } from '../request/port/system'
const Constants = require('./constants');

class user {
    constructor() {
        try {
          this.accountInfo = wx.getAccountInfoSync()
        } catch(e) {
          this.accountInfo = null
        }

        try {
            let authToken = Session.get()
            if (authToken) {
                this.authToken = authToken
            } else {
                throw false
            }
        } catch (e) {
            this.authToken = null
        }

        try {
            let authUser = Session.getUser()
            if (authUser) {
                this.authUser = authUser
            } else {
                throw false
            }
        } catch (e) {
            this.authUser = null
        }
    }

    /**
     * 是否登录过
     * @returns boolean
     * @memberof User
     */
    ckLogin() {
      try {
        let AuthToken = Session.get()
        let AuthUser = Session.getUser()
        if (AuthToken && AuthUser) {
          return AuthToken
        } else {
          throw false
        }
      } catch (e) {
        return false
      }
    }

    ckLoginGoBack(callBack) {
        if (typeof callBack !== 'function') {
            throw 'The param is wrong!'
        }
        if (this.ckLogin()) {
            callBack()
        }
    }
    /**
     * 清除所有的storage
     * @returns boolean
     * @memberof User
     */
    clear() {
      try {
        this.authToken = null
        Session.clear()
      } catch (e) {}
    }

    /**
     * 用户登录
     * @param {any} code
     * @param {any} userInfo
     * @param {any} cb (authToken)
     * @memberof User
     */
    goLogin(data) {
      return new Promise((resolve, reject) => {
          return this._getWxLogin()
              .then(code => {

                  data = Object.assign({}, {code,}, data)
                  return wxaLogin(data)
                      .then(res => {
                          // 缓存token
                          this.authToken = res.data.session_key
                          Session.set(res.data.session_key)

                          // 缓存token
                          this.authUser = res.data.user
                          Session.setUser(res.data.user)

                          resolve(res)
                      }, ret => {
                          reject(ret)
                      })
              }, ret => {
                  reject(ret)
              })
      })
    }

    checkLogin() {
        return new Promise((resolve, reject) => {
            return this._getWxLogin()
                .then(code => {
                    return checkLogin({code})
                        .then(res => {
                            // 缓存token
                            this.authToken = res.data.session_key
                            Session.set(res.data.session_key)

                            // 缓存token
                            this.authUser = res.data.user
                            Session.setUser(res.data.user)

                            resolve(res.data.session_key)
                        }, ret => {
                            reject(ret)
                        })
                }, ret => {
                    reject(ret)
                })
        })
    }

    /**
     * 获取微信用户信息
     *
     * @param {any} cb (userInfo, code)
     * @memberof User
     */
    _getWxLogin() {
      return new Promise((resolve, reject) => {
        wx.login({
          success: res => {
            resolve(res.code)
          },
          fail: ret => {
            reject(ret)
          }
        })
      })
    }

    /**
     * 集合code appid参数
     */
    gatherUserParams(data) {
      return new Promise((resolve, reject) => {

          return this._getWxLogin().then(code => {

            data = Object.assign({}, {
              code,
              appId: this.accountInfo.miniProgram.appId
            }, data)

            resolve(data)
          }, ret => {
            reject(ret)
          })
      })
    }

}

module.exports = user
