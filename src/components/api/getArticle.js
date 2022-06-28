import request from '../requst/requst'
// 获取文章内容
const getArchives = function (id) {
  const params = new URLSearchParams()
  params.append('id', id)
  return request.get('/archives/?id=' + id)
}

export default {
  getArchives
}
