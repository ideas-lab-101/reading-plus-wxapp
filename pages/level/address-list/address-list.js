const App = getApp()
import { getStoreList } from "../../../request/port/main";
import { $wuLoading } from '../../../components/wu/index';

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,
    nav: {
      title: '体验店信息',
      model: 'extrude',
      transparent: false,
      navTitle: ''
    },
    /**
     * data
     */
    content: {
      pageNumber: 1,
      lastPage: false,
      list: [],
      pageSize: 20,
      totalRow: 0
    }
  },

  onLoad: function (options) {
    this.optionsAddress = options.address?JSON.parse(options.address): ''

    this.__init(true)
  },

  onReachBottom: function () {
    this._ReachBottom()
  },

  __init(isPageShow) {
    let { pageNumber, pageSize, list } = this.data.content
    if (isPageShow) {
      pageNumber = 1
    }

    $wuLoading().show()
    this.setData({isLoading: true})

    getStoreList({
      page: pageNumber,
      pageSize,
      coordinate: this.optionsAddress
    })
        .then(res => {
          /**
           * 渲染数据
           * @type {*[]|*}
           */
          let tempList = [...res.data.list]
          if (!isPageShow) {
            tempList = list.concat(res.data.list)
          }
          this.setData({
            'content.lastPage': res.data.lastPage,
            'content.totalRow': res.data.totalRow,
            'content.list': tempList
          })
        })
        .finally(() => {
          this.setData({isLoading: false})
          $wuLoading().hide()
        })
  },

  /**
   * 下拉加载更多
   * @returns {boolean}
   * @private
   */
  _ReachBottom() {
    let { lastPage, pageNumber } = this.data.content
    if (lastPage || this.data.isLoading) {
      return false
    }

    pageNumber++
    this.data.content.pageNumber = pageNumber

    this.__init()
        .catch(() => {
          this.data.content.pageNumber--
        })
  },


  goAddressDetail(e) {
    const {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/level/address-detail/address-detail?id=${id}`
    })
  }
})
