import request from '../requst/requst'
export const getArticleList = function () {
  return request.get('/list')
}
