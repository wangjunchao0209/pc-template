import Message from './mountMessage'
export default {
  install(app) {
    // 如果你想挂载全局的属性，能够通过组件实例调用的属性   this.$lsmessage
    app.config.globalProperties.$lsmessage = Message // 原型函数
  }
}