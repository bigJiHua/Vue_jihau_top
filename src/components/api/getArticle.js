import request from '../request/request'
// 获取文章内容
const getArchives = function (id) {
  const params = new URLSearchParams()
  params.append('id', id)
  if (localStorage.getItem('Username')) {
    params.append('user', localStorage.getItem('Username'))
  }
  return request.get('/archives/', { params })
}

export default {
  getArchives
}
