const App = getApp()
import { checkAccount } from '../../../request/port/train'

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,
    nav: {
      title: '缓解视疲劳',
      model: 'extrude',
      transparent: false,
      navTitle: ''
    },

    isAuthorizeScopeLocation: App.authorize.scopeLocation,
    content: null
  },
  onLoad: function (options) {
    this.__init()
  },

  onShow() {
  },

  __init() {
    checkAccount()
        .then(res => {
          this.setData({ content: res.data})
        })
  },

  goStep(e) {
    const { content, isAuthorizeScopeLocation } = this.data
    if(isAuthorizeScopeLocation) {
      return false
    }
    if (!content.eye_account_info || content.coupon_num <= 0) {
      return false
    }

    this.settingLocation(() => {
      wx.navigateTo({
        url: `/pages/apply/play-view/play-view`
      })
    })
  },
  /**
   * 获取授权
   * @param callBack
   * @returns {boolean}
   */
  settingLocation(callBack) {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              callBack()
            },
            fail: (e) => {
              this.setData({ isAuthorizeScopeLocation: true })
              App.authorize.scopeLocation = true
            }
          })
          return false
        }
        callBack()
      }
    })
  },
  /**
   * 录音拒绝后重新授权
   * @param e
   */
  openSettingAuthorize: function (e) {
    if (e.detail.authSetting['scope.userLocation']) {
      this.setData({ isAuthorizeScopeLocation: false })
      App.authorize.scopeLocation = false
    }
  },

  goAssessment(e) {
    wx.navigateTo({
      url: `/pages/apply/investigation/investigation`,
      events: {
        acceptDataFromInvestigation: (data) => {
          this.__init()
        }
      }
    })
  },

  goBuy(e) {
    wx.navigateTo({
      url: `/pages/level/coupon-list/coupon-list`,
      events: {
        acceptDataFromBuyCoupon: (data) => {
          this.__init()
        }
      }
    })
  }

})
