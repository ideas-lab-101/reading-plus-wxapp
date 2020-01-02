/**
 * 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象
 * @param {String} selector 节点选择器
 * @param {Object} ctx 页面栈或组件的实例，默认为当前页面栈实例
 */
const getCtx = (selector, ctx = getCurrentPages()[getCurrentPages().length - 1]) => {
    const componentCtx = ctx.selectComponent(selector)

    if (!componentCtx) {
        throw new Error('无法找到对应的组件，请按文档说明使用组件')
    }

    return componentCtx
}

const $wuBackdrop = (selector = '#wu-backdrop', ctx) => getCtx(selector, ctx)
const $wuLoading = (selector = '#wu-loading', ctx) => getCtx(selector, ctx)
const $wuNavigation = (selector = '#wu-navigation', ctx) => getCtx(selector, ctx)
const $wuSlogon = (selector = '#wu-slogon', ctx) => getCtx(selector, ctx)
const $wuLogin = (selector = '#wu-login', ctx) => getCtx(selector, ctx)

export {
    $wuBackdrop,
    $wuLoading,
    $wuNavigation,
    $wuSlogon,
    $wuLogin
}