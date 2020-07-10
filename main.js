import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局r-ui
import rUI from 'rview-ui'
Vue.use(rUI)

// http拦截器
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor)

const app = new Vue({
    ...App
})
app.$mount()
