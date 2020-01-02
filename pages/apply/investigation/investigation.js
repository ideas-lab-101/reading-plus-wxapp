const App = getApp()
import { editEyeAccount, getEyeAccount } from '../../../request/port/user'
import Dialog from '../../../viewMethod/dialog';
import Toast from "../../../viewMethod/toast";

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,
    nav: {
      title: '脑视觉功能评估',
      model: 'extrude',
      transparent: false,
      navTitle: ''
    },

    content: null,
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
    this.eventChannel = this.getOpenerEventChannel()
    this.__init()
  },

  onUnload() {
    clearTimeout(this.backFn)
  },

  __init() {
    getEyeAccount()
        .then(res => {
          this.data.content = res.data

          if (res.data) {
            const topic = this.formatTopic(res.data.detail)
            this.setData({ topic })
          }

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

    let account_id = 0
    const { content } = this.data
    if (content && content.account_id) {
      account_id = content.account_id
    }
    editEyeAccount({...value, account_id})
        .then(res => {
          Toast.success({text: '提交成功!'})
          this.eventChannel.emit('acceptDataFromInvestigation', {})
          this.backFn = setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        })
  },


  radioChange(e) {
    //console.log(e)
  }

})
