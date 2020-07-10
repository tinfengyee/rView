import http from '../rview-ui/libs/request'
import { toast } from '../rview-ui/libs/function'
// 配置url是否通过api文件设置
import api from './api.js'

const install = (Vue) => {
  http.setConfig({
    baseUrl: 'http://shop.dt.hero6666.com/api' // 请求的根域名
  });
  // 请求拦截，配置Token等参数
  http.interceptor.request = (config) => {
    const token = uni.getStorageSync('token') || 'no-token';
    // 配置url是否通过api文件设置
    if (api.hasOwnProperty(config.url)) {
      config.url = api[config.url];
    }
    
    config.header.token = token;
    
    if (config.url === '/user/login') config.header.noToken = true;
    return config;
  };
  // 响应拦截，判断状态码是否通过
  http.interceptor.response = (res) => {
    if (res.status == 200) {
      return res.data;
    } else if (res.status == 40001) {
      toast('验证失败');
      setTimeout(() => {
        toast('Login');
      }, 1500)
      return false;
    } else {
      return false;
    }
  }
}
export default {
  install
}