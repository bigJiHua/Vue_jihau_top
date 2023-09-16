import axios from 'axios'
import { app } from '@/main'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://192.168.0.103:666/api',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, function (error) {
  Toast({ position: 'top', message: error })
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(response => {
  const { data: res } = response
  if (res.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('UserData')
    app.$router.push('/')
    location.reload()
  }
  Toast({ position: 'top', message: res.message })
  return response
}, function (error) {
  Toast({ position: 'top', message: error.message })
  if (error.request.status === 401 || error.request.statusText === 'Unauthorized') {
    localStorage.removeItem('token')
    localStorage.removeItem('UserData')
    app.$router.push('/Login')
    location.reload()
  } else if (error.request.status === 404) {
    app.$router.push('/404')
  }
  return Promise.reject(error)
})

export default request
