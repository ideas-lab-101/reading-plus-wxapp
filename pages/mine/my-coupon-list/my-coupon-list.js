import { userCouponList } from "../../../request/port/user";
const App = getApp()
import { $wuLogin } from '../../../components/wu/index';

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,
    nav: {
      title: '我的券',
      model: 'extrude',
      transparent: false,
      navTitle: ''
    },
    contentList: null,

    qrcode: {
      fgColor: 'black',
    }
  },
  onLoad: function (options) {
    this.PageOnLoad = true
    this.__init()
  },

  onShow() {
    if (!this.PageOnLoad && App.requestManager.update('orderPay', this.route)) {
      this.__init()
    }
  },

  onHide() {
    this.PageOnLoad = false
  },

  onUnload() {
    this.PageOnLoad = false
  },

  __init() {
    userCouponList()
        .then(res => {
          this.setData({
            contentList: res.data.list,
          })
        })
  },

  goBuy() {
    wx.navigateTo({
      url: `/pages/level/coupon-list/coupon-list`
    })
  },
  /**
   * 二维码放大
   */
  previewImage(e) {
    console.log(e)
    const id = e.currentTarget.id
    // 在自定义组件下，当前组件实例的 this，以操作组件内 <canvas> 组件
    const that = this.selectComponent('#'+id)
    wx.canvasToTempFilePath({
        canvasId: 'wux-qrcode',
        success: (res) => {
            wx.previewImage({
                urls: [res.tempFilePath]
            })
        }
    }, that)
  },

})
