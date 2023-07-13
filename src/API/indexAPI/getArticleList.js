import request from '../request'
// 首页获取文章
const getArticleList = function (page) {
  return request.get('/data/list?page=' + page)
}

// 文章归档
const getArchive = function () {
  return request.get('/data/archive')
}

export default {
  getArticleList,
  getArchive
}
