import request from '../requst/requst'
// 首页获取文章
const getArticleList = function () {
  return request.get('/data/list')
}

export default {
  getArticleList
}
