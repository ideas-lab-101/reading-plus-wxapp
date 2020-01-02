import { $wuLogin } from '../../../components/wu/index';
import {doTrain} from "../../../request/port/train";
const App = getApp()

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,

    isAuthorizeScopeLocation: false
  },
  onLoad: function (options) {

  },

  goAddressList() {
    const { isAuthorizeScopeLocation } = this.data
    if(isAuthorizeScopeLocation) {
      return false
    }

    this.settingLocation((success) => {
        if (!success) {
            this.goAddressListLink()
            return false
        }
        wx.getLocation({
            type: 'wgs84',
            success: res => {
              this.goAddressListLink(res)
            }
        })
    })
  },

  goAddressListLink(address) {
      const coordinate = address? JSON.stringify(address) : ''
      wx.navigateTo({
          url: `/pages/level/address-list/address-list?address=${coordinate}`
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
            success: (e) => {
              callBack(true)
            },
            fail: (e) => {
              callBack()
            }
          })
          return false
        }
        callBack(true)
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

  goBuyCoupon() {
    if (!App.user.ckLogin()) {
      $wuLogin().show({
        FunInherit: this.couponInherit.bind(this)
      })
      return false
    }
    
    this.couponInherit()
  },

  couponInherit() {
    wx.navigateTo({
      url: `/pages/level/coupon-list/coupon-list`
    })
  },

})
