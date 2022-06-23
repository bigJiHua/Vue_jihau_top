import request from '../requst/requst'
// 首页获取文章
const getArchives = function (id) {
  const params = new URLSearchParams()
  params.append('id', id)
  return request.get('/archives/?id=' + id)
}
export default {
  getArchives
}
