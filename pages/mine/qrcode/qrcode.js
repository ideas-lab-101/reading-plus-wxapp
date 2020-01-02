const App = getApp()
import { getEyeAccount } from '../../../request/port/user'
import Dialog from '../../../viewMethod/dialog';

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,
    nav: {
      title: '脑视觉功能评估',
      model: 'extrude',
      transparent: false,
      navTitle: ''
    },

    serial: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    topic: [
      {
        stem: '是否有矫正视力',
        code: 'd1',
        answer: [
          {
            key: 1,
            value: '是',
            checked: false
          },
          {
            key: 0,
            value: '否',
            checked: false
          }
        ]
      },
      {
        stem: '是否有散光度数',
        code: 'd2',
        answer: [
          {
            key: 1,
            value: '是',
            checked: false
          },
          {
            key: 0,
            value: '否',
            checked: false
          }
        ]
      }
    ]
  },
  onLoad: function (options) {
    this.__init()
  },

  __init() {
    getEyeAccount()
        .then(res => {
          const topic = this.formatTopic(res.data.detail)
          this.setData({ topic })
        })
  },

  formatTopic(data) {
    const { topic } = this.data
    topic.map((item, index) => {
      const _i = data.find(i => item.code === i.dimension)
      item.answer.map(j => {
        if (j.key === Number(_i.value)) {
          j.checked = true
        }
        return j
      })
    })
    return topic
  },

  formSubmit(e) {
    const value = e.detail.value
    const result = Object.values(value).some(item => item === '')
    if (result) {
      Dialog.alert({
        title: '问卷提示',
        content: '还没回答完毕，请填完问卷！',
        onConfirm() {},
      })
      return false
    }

    addEyeAccount({...value})
        .then(res => {
        })
  }

})
