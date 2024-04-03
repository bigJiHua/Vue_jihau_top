import request from '../request'
// 首页获取文章
const getArticleList = function (page) {
  return request.get('/data/list?page=' + page)
}

// 文章归档
const getArchive = function () {
  return request.get('/data/archive')
}
// 通知列表
const getNotifyList = function (num) {
  const user = localStorage.getItem('Username')
  if (user) {
    return request.get('/data/notify?user=' + user + '&Num=' + num)
  }
  return request.get('/data/notify?Num=' + num)
}
// 搜索接口
const SearchApi = function (key, type) {
  const params = new URLSearchParams()
  params.append('key', key)
  params.append('type', type)
  return request.get('/data/search', { params })
}
export default {
  getArticleList,
  getArchive,
  getNotifyList,
  SearchApi
}
