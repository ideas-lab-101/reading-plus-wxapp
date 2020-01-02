const App = getApp()
import { getInfoContent } from '../../../request/port/info'
import Dialog from '../../../viewMethod/dialog';
import Toast from "../../../viewMethod/toast";
const WxParse = require('../../../components/wxParse/wxParse')

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,
    nav: {
      title: '',
      model: 'extrude',
      transparent: false,
      navTitle: ''
    },
    content: null
  },
  onLoad: function (options) {
    this.optionsId = options.id

    this.__init()
  },

  __init() {
    getInfoContent({
      info_id: this.optionsId
    })
        .then(res => {
            this.setData({ content: res.data, 'nav.title': res.data.title })
            this.distinguishType(res.data)
        })
  },

  distinguishType(data) {
    switch (data.content_type) {
      case 'html':
        WxParse.wxParse('detail', 'html', data.content || '<p style="font-size: 14px;">暂无介绍</p>', this, 5)
        break
      case 'url':
        break
    }
  },

  webLoad(e) {
    console.log(e)
  },
  webError(e) {
    console.log(e)
  }
})
