const App = getApp()
import { trainFeedback } from '../../../request/port/train'
import Dialog from '../../../viewMethod/dialog';
import Toast from "../../../viewMethod/toast";

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,
    nav: {
      title: '使用反馈',
      model: 'extrude',
      transparent: false,
      navTitle: ''
    },

    content: null,
    rater: 5
  },
  onLoad: function (options) {
    this.optionsId = options.id
    this.__init()
  },

  onUnload() {
    clearTimeout(this.backFn)
  },

  __init() {
  },

  formSubmit(e) {
    const value = e.detail.value
    const { rater } = this.data

    trainFeedback({
      train_id: this.optionsId,
      rank: rater,
      feedback: value.feedback.trim()
    })
        .then(res => {
          Toast.success({text: '提交成功!'})
          this.backFn = setTimeout(() => {
            wx.redirectTo({
              url: `/pages/level/coupon-list/coupon-list`
            })
          }, 1000)
        })
  },


  raterChange(e) {
    this.data.rater = e.detail.value
  }

})
