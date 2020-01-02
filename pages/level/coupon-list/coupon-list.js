import { getCouponList, getCoupon } from "../../../request/port/coupon";
import { orderPay } from "../../../request/port/order";
const App = getApp()
import { $wuLogin, $wuBackdrop } from '../../../components/wu/index';
import Toast from "../../../viewMethod/toast";

Page({
  data: {
    statusBarHeight: App.globalData.equipment.statusBarHeight,
    nav: {
      title: '劵列表',
      model: 'extrude',
      transparent: false,
      navTitle: ''
    },
    contentList: null,
    deduction: {
        focus: false,
        value: ''
    }
  },
  onLoad: function (options) {
    this.eventChannel = this.getOpenerEventChannel()

    this.__init()
  },

  __init() {
    getCouponList()
        .then(res => {
          this.setData({
            contentList: res.data.list,
          })
        })
  },
  /**
   * 购买
   * @returns {boolean}
   */
  goBuy(e) {
    if (!App.user.ckLogin()) {
      $wuLogin().show()
      return false
    }
    const { index } = e.currentTarget.dataset
    const { contentList } = this.data
    const coupon_type = contentList[index].coupon_type

    getCoupon({ coupon_type })
        .then(res => {

          if (!res.data || !res.data.order_info) {
            return false
          }
          orderPay({
            out_trade_no: res.data.order_info.order_code,
            total_fee: res.data.order_info.total_pay
          })
              .then(res => {
                  Toast.text({ text: '领取成功！'})
                  this.eventChannel.emit('acceptDataFromBuyCoupon', {})
              })

        })
  },
    /**
     * 抵扣
     * @param e
     * @returns {boolean}
     */
    goDeduction(e) {
        if (!App.user.ckLogin()) {
            $wuLogin().show()
            return false
        }
        this.DeductionIndex = e.currentTarget.dataset.index

        $wuBackdrop().retain()
        this.setData({ in: true, 'deduction.focus': true})
    },
    freeDeduction() {
        $wuBackdrop().release()
        this.setData({ in: false, 'deduction.focus': false, 'deduction.value': ''})
    },
    noop() {
      return {}
    },

    formSubmit(e) {
        console.log(e)
        const { contentList } = this.data
        const coupon_type = contentList[this.DeductionIndex].coupon_type
        const  redeem_code = e.detail.value.code.trim()

        if (e.detail.value.code.trim() === '') {
            Toast.text({ text: '请输入兑换码！'})
            return false
        }
        getCoupon({ coupon_type, redeem_code })
            .then(res => {
                Toast.text({ text: '兑换成功！'})
                this.eventChannel.emit('acceptDataFromBuyCoupon', {})
                this.freeDeduction()
            })
    }

})
