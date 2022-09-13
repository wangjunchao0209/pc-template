import allCom from './install'
import Message from './message/index'
// 所有组件列表
const components = Object.keys(allCom).map(f=> allCom[f])
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  // 遍历注册所有组件
  components.map(component => Vue.component(component.name, component))
  Message.install(Vue)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  ...components
}