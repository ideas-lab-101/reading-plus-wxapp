import { $wuLogin } from '../../../components/wu/index';
import Dialog from "../../../viewMethod/dialog";
const App = getApp()

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight
  },
  onLoad: function (options) {
  },
  onShareAppMessage(options) {
    const name = App.user.authUser.caption
    return {
      title: `${name}邀请您加入训练`,
      path: `/pages/tabBar/index/index`,
      imageUrl: `https://7265-reading-plus-vm4nm-1300905784.tcb.qcloud.la/slogon/cover_bg%401x.jpg?sign=706356238d6ef7869bdd765b79002a55&t=1576159435`
    }
  },

  goReport(e) {
    if (!App.user.ckLogin()) {
      $wuLogin().show({
        FunInherit: this.reportInherit.bind(this)
      })
      return false
    }
    this.reportInherit()
  },
  reportInherit() {
    wx.navigateTo({
      url: `/pages/mine/report/report`
    })
  },

  goCouponList(e) {
    if (!App.user.ckLogin()) {
      $wuLogin().show({
        FunInherit: this.couponListInherit.bind(this)
      })
      return false
    }
    this.couponListInherit()
  },
  couponListInherit() {
    wx.navigateTo({
      url: `/pages/mine/my-coupon-list/my-coupon-list`
    })
  },

  goTrain() {
    if (!App.user.ckLogin()) {
      $wuLogin().show({
        FunInherit: this.trainInherit.bind(this)
      })
      return false
    }
    this.trainInherit()
  },
  trainInherit() {
    wx.navigateTo({
      url: `/pages/mine/my-train-list/my-train-list`
    })
  },

  goRemind() {
    Dialog.alert({
      title: '静等期待',
      content: '模块正在开发，静等期待！',
      onConfirm() {},
    })
  },

  goAbout() {
    wx.navigateTo({
      url: `/pages/apply/info-content/info-content?id=10`
    })
  }

})
