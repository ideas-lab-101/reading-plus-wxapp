import baseBehavior from '../helpers/baseBehavior'
import { $wuBackdrop } from '../../../components/wu/index'
const App = getApp()

const defaults = {
  title: '数据加载中',
  mask: false,
  transitionName: 'wux-animate--punch'
}

Component({
  data: defaults,
  behaviors: [baseBehavior],
  properties: {},
  lifetimes: {
    created: function () {
      this.$wuBackdrop = $wuBackdrop('#wu-backdrop', this)
    },
    attached: function () {
    },
    detached: function(){
    }
  },
  methods: {
    /**
     * 显示
     * @param options
     */
    show (opts = {}) {
      const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, this.data, opts))
      this.setData({ ...options, in: true })
      this.$wuBackdrop.retain()
    },
    /**
     * 关闭
     * @returns {boolean}
     */
    hide(){
      this.setData({ in: false })
      this.$wuBackdrop.release()
    },

    onCancel() {
    },

    getUserInfo(e) {
      if (e.detail.errMsg === "getUserInfo:ok") {
        const FunInherit = this.fns.FunInherit

        App.user.goLogin({
                userInfo: JSON.stringify(e.detail.userInfo)
              })
                  .then(res => {
                    this.hide()
                    if (FunInherit && typeof FunInherit === 'function') {
                      FunInherit()
                    }

                  })
      }
    }
  }
})
