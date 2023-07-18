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
const getNotifyList = function () {
  const user = localStorage.getItem('Username')
  if (user) {
    return request.get('/data/notify?user=' + user)
  }
  return request.get('/data/notify')
}
export default {
  getArticleList,
  getArchive,
  getNotifyList
}
