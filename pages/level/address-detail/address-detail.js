import { $wuLogin } from '../../../components/wu/index';
const App = getApp()
import { getStoreInfo } from "../../../request/port/main";

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
    content: null,
    coordinate: null,
    markers: []
  },

  onLoad: function (options) {
    this.optionsId = options.id

    this.__init(true)
  },

  __init() {
    getStoreInfo({
      store_id: this.optionsId
    })
        .then(res => {
          const coordinate = JSON.parse(res.data.store_info.coordinate)

          let mark = {
            id: 0,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            width: 16,
            height: 30
          }

          this.setData({
            content: res.data.store_info,
            coordinate,
            markers: [mark]
          })
        })
  },
  /**
   * map
   * @param e
   */
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }

})
