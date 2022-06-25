import request from '../requst/requst'
// 首页获取文章
const getArchives = function (id) {
  const params = new URLSearchParams()
  params.append('id', id)
  return request.get('/archives/?id=' + id)
}
const getArticleData = function (id) {
  const params = new URLSearchParams()
  params.append('article_id', id)
  return request.get('/data/artdata', { params })
}
const getArticleCom = function (id) {
  const params = new URLSearchParams()
  params.append('article_id', id)
  return request.get('/data/artcomm', { params })
}
export default {
  getArchives,
  getArticleData,
  getArticleCom
}
