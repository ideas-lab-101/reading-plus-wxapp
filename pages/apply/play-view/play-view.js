import { doTrain } from "../../../request/port/train";
import { $wuLoading, $wuNavigation } from '../../../components/wu/index';
const App = getApp()
import Toast from "../../../viewMethod/toast";
const ImgLoader = require('../../../components/img-loader/img-loader')

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,
    nav: {
      title: '脑视觉体验',
      model: 'extrude',
      transparent: false,
      navTitle: ''
    },

    direction: 'portrait',
    playing: false,
    content: null,
    loaded: false,
    imageIds: [
      {
        id: 'image0',
        result: false
      },
      {
        id: 'image1',
        result: false
      },
      {
        id: 'image2',
        result: false
      }
    ],
    imagesList: []
  },

  onLoad: function (options) {
    $wuLoading().show()

    /**
     * 初始化图片预加载组件，并指定统一的加载完成回调
     * @type {ImgLoader}
     */
    this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
    this.__init()
  },

  onUnload() {
    clearInterval(this.timeFn)
  },

  onResize: function(options) {
    console.log('resize', options)
    const { playing, loaded } = this.data
    if (!loaded) {
      return false
    }

    if (options.deviceOrientation === 'landscape') {

      if (!playing) {
        this.countDown()
      }
      this.setData({
        direction: 'landscape',
        playing: true
      })
      $wuNavigation().hide()
    }else {

      $wuNavigation().show()
      this.setData({
        direction: 'portrait'
      })
    }
  },

  __init: function() {
    this.doTrain()
  },

  doTrain() {
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        console.log(res)
        const coordinate = JSON.stringify(res)
        doTrain({coordinate})
            .then(res => {

              this.setData({
                content: res.data.model_info,
              })
              this.data.trainId = res.data.train_id
              this.data.imagesList = this.genImgListData([res.data.model_info.l_url, res.data.model_info.r_url])

              this.loadImages()
            })
      }
    })
  },
  /**
   * 图片加载完成后的回调
   * @param err
   * @param data
   */
  imageOnLoad(err, data) {
    console.log('图片加载完成', err, data)
    const imagesList = this.data.imagesList.map(item => {
      if (item.url === data.src)
        item.loaded = true
      return item
    })
    this.setData({ imagesList })

    const res = this.data.imagesList.some(item => item.loaded === false)
    if (!res) {
      this.setData({ leftUrl: imagesList[0].url, rightUrl: imagesList[1].url})
    }
  },
  /**
   * 同时发起全部图片的加载
   */
  loadImages() {
    this.data.imagesList.forEach(item => {
      this.imgLoader.load(item.url)
    })
  },

  genImgListData(images) {
    images = images.concat(images.slice(0, 4))
    return images.map(item => {
      return {
        url: item,
        loaded: false
      }
    })
  },
  /**
   * 倒计时
   */
  countDown() {
      const { content, trainId } = this.data
      this.timeFn = setInterval(() => {
        if (content.time <= 1) {
          clearInterval(this.timeFn)
          wx.redirectTo({
            url: `/pages/apply/feedback/feedback?id=${trainId}`
          })
          return false
        }
        content.time--
        this.setData({'content.time': content.time})
      }, 1000)
  },

  /**
   * 图片加载判断
   * @param e
   */
  imageLoad(e) {
    const { imageIds } = this.data
    const id = e.currentTarget.id
    imageIds.map(item => {
      if (id === item.id) {
        item.result = true
      }
      return item
    })
    this.data.imageIds = imageIds
    const res = this.data.imageIds.some(item => item.result === false)

    if (!res) {
      this.setData({ loaded: true})
    }
  },

  imageError(e) {
    Toast.fail({text: '加载失败，请重新进入!'})
  }
})
