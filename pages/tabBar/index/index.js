import { $wuLogin } from '../../../components/wu/index';
const App = getApp()
import Dialog from '../../../viewMethod/dialog'
import {getIndex} from "../../../request/port/main";

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,
    globalSlogon: {
      urls: {
        x1: `https://7265-reading-plus-vm4nm-1300905784.tcb.qcloud.la/slogon/cover_bg%401x.jpg?sign=706356238d6ef7869bdd765b79002a55&t=1576159435`,
        x2: `https://7265-reading-plus-vm4nm-1300905784.tcb.qcloud.la/slogon/cover_bg%402x.jpg?sign=2af5f357782e1e394d0a1afb9fe05300&t=1576159454`
      },
      version: App.version
    },
    list: []
  },
  onLoad: function (options) {
    this.__init()
  },

  __init() {
    getIndex()
        .then(res => {
            this.setData({ list: res.data.list})
        })
  },

  goProcess() {
    if (!App.user.ckLogin()) {
      $wuLogin().show({
        FunInherit: this.processInherit.bind(this)
      })
      return false
    }
    this.processInherit()
  },

  goInfoContent(e) {
    const { index } = e.currentTarget.dataset
    const { list } = this.data
    wx.navigateTo({
      url: `/pages/apply/info-content/info-content?id=${list[index].info_id}`
    })
  },

  processInherit() {
    wx.navigateTo({
      url: `/pages/apply/technological-process/technological-process`
    })
  },

  goTrain(e) {
    Dialog.alert({
      title: '静等期待',
      content: '模块正在开发，静等期待！',
      onConfirm() {},
    })
  },

  goInfoDelContent(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/apply/info-content/info-content?id=${id}`
    })
  }

})
