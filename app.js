/**
 * 解决IOS版本过低出现的不兼容问题
 */
const { compatible } = require('./utils/compatibleIos')
compatible()

const Request = require('./utils/request')
const RequestManager = require('./utils/requestManager')
const { equipmentStatus, checkVersion } = require('./utils/equipment')
const { checkVersionUpdate } = require('./utils/updateVersion')
const { networkChange } = require('./utils/network')
const User = require('./utils/user')

App({
  onLaunch: function (options) {
    this.launch = true
    console.log('App launch:', options)
    /**
     * 版本检测
     */
    checkVersion()
    /**
     * 检查程序更新
     */
    checkVersionUpdate()
    /**
     * 网络监听
     */
    networkChange()

  },
  onShow: function(options) {
    console.log('App show:', options)
  },

  onHide: function () {
    console.log('App hide:')
  },

  onError: function (msg) {
    console.error('APP错误日志：', msg)
  },

  onPageNotFound(res) {
    console.error(res)
  },
  globalData: {
    /**
     * 移动设备基本信息
     */
    equipment: equipmentStatus(),

  },
  /**
   * 保存是否已经授权过一次的信息
   */
  authorize: {
    scopeLocation: false
  },

  /**
   * 全局单一实例
   */
  version: '1.0.0',
  request: Request, // 数据请求封装
  requestManager: new RequestManager(), // 请求更新管理器
  user: new User(), // 判断用户登录
})