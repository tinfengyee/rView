// 引入全局mixin
import mixin from './libs/mixin/mixin.js'
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
import http from './libs/request'

function wranning(str) {
  // 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (process.env.NODE_ENV === 'development') {
    console.warn(str)
  }
}

// 导出rView工具函数
import {
  toast,
  $parent,
  addUnit,
  colorGradient,
  deepClone,
  deepMerge,
  getParent,
  guid,
  md5,
  queryParams,
  random,
  randomArray,
  route,
  validate,
  timeFormat,
  timeFrom,
  trim,
  type2icon
} from './libs/function'

const $r = {
  type: ['primary', 'success', 'error', 'warning', 'info'],
  toast,
  http,
  get: http.get,
  post: http.post,
  put: http.put,
  'delete': http.delete,
  $parent,
  addUnit,
  colorGradient,
  colorGradient: colorGradient.colorGradient,
  hexToRgb: colorGradient.hexToRgb,
  rgbToHex: colorGradient.rgbToHex,
  deepClone,
  deepMerge,
  getParent,
  guid,
  md5,
  queryParams,
  random,
  randomArray,
  route,
  validate,
  timeFormat,
  date: timeFormat, // 另名date
  timeFrom,
  trim,
  type2icon
}

const install = Vue => {
  Vue.mixin(mixin);
  
  // 注入到全局过滤器
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', (timestamp, format) => {
    return timeFormat(timeFormat, format)
  })
  Vue.filter('date', (timestamp, format) => {
    return timeFormat(timestamp, format)
  })
  // 将多久以前的方法
  Vue.filter('timeFrom', (timestamp, format) => {
    return timeFrom(timestamp, format)
  })
  
  // 挂载原型
  Vue.prototype.$http = http;
  Vue.prototype.$r = $r;
}

export default {
  install
}
