
/**
 * Author WU
 * 2019/5/30
 * audio
 */
const bind = (fn, ctx) => {
  return (...args) => {
    return args.length ? fn.apply(ctx, args) : fn.call(ctx)
  }
}

class Package {
  constructor(options = {}, page = getCurrentPages()[getCurrentPages().length - 1]) {
    this.fns = {}
    this.options = {}
  }

  /**
   * 默认参数
   */
  setDefaults() {
    return {
    }
  }

  /**
   * 初始化
   **/
  __init(opts, page) {
    const defaultOptions = this.setDefaults()
    const options = Object.assign({}, opts)

    for (const key in defaultOptions) {
      if (defaultOptions.hasOwnProperty(key)) {

        this.options[key] = typeof options[key] !== `undefined` ? options[key] : defaultOptions[key]

        if(typeof this.options[key] === 'function') {
          this.fns[key] = bind(this.options[key], this)
          delete this.options[key]
        }
      }
    }

    Object.assign(this, {
      page,
      options: this.options,
    })
  }

}

module.exports = Package
