import requst from '../requst/requst'
// 首页获取文章
const getArticleList = function () {
  return requst.get('/data/list')
}

// 文章归档
const getArchive = function () {
  return requst.get('/data/archive')
}

export default {
  getArticleList,
  getArchive
}
