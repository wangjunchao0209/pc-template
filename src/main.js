import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import WUI from './packages'
const app = createApp(App)
app.use(store).use(router).use(WUI).use(ElementPlus).mount('#app')
