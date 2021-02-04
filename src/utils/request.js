import axios from 'axios'
import router from '@/router/index'
import { Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Settings from '@/settings'
import Config from '@/config'
import Cookies from 'js-cookie'
import qs from "qs"

// 创建axios实例
const service = axios.create({
   baseURL: Config.hosts.request,
   timeout: Settings.timeout // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
  config =>{
    if(config.method === "get"){
      // 序列化
      config.paramsSerializer = function (params) {
        // a: ['b', 'c'] arrayFormat: "repeat" a=b&a=c 格式化数组参数 indices 'a[0]=b&a[1]=c' brackets 'a[]=b&a[]=c'
          return qs.stringify(params , {arrayFormat: "repeat"}) // qs.stringify()将对象 序列化成URL的形式，以&进行拼接
      }
    }
    // 如果 没有 token
    if (config.noToken !== true && getToken()){
      config.headers['Authorization_SHOP'] = getToken() // 让每个请求携带自定义token
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
   error => {
     console.log('request',error) 
     Promise.reject(error)
   }
)

// 相应拦截
service.interceptors.response.use(
  response => {
    const code = response.status
    if(code < 200 || code > 300){
      Notification.error({
        title: "请求失败",
        message: response.message,
        duration: 3000,
        offset: 60,
      })
       return Promise.reject('error')
    } else {
       return response.data
    }
  },
    error => {
      let code = 0
      try {
        code = error.response.data.status
      } catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
          Notification.error({
            title: "请求失败",
            message: '网络请求超时',
            duration: 3000,
            offset: 60,
          })
          return Promise.reject(error)
        }
      }
      if (code) {
        if (code === 401) {
          store.dispatch('LogOut').then(() => {
            Cookies.set('point', 401)
            location.reload()
          })
        } else if (code === 403) {
          router.push({
            path: '/401'
          })
        } else {
          const errorMsg = error.response.data.message
          if (errorMsg !== undefined) {
            Notification.error({
              title: "请求失败",
              message: errorMsg,
              duration: 3000,
              offset: 60,
            })
          }
        }
      } else {
        Notification.error({
          title: "请求失败",
          message: '接口请求失败',
          duration: 3000,
          offset: 60,
        })
      }
      return Promise.reject(error)
    }
)
export default service