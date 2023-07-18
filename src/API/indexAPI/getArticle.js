import request from '../request'
// 获取文章内容
const getArchives = function (id) {
  const params = new URLSearchParams()
  params.append('id', id)
  if (localStorage.getItem('Username')) {
    params.append('user', localStorage.getItem('Username'))
  }
  return request.get('/data/article/', { params })
}

// 获取通知内容
const getPageData = function (id) {
  const params = new URLSearchParams()
  params.append('id', id)
  if (localStorage.getItem('Username')) {
    params.append('user', localStorage.getItem('Username'))
  }
  return request.get('/data/page/', { params })
}

// 增加阅读数
const UpdatedReadNum = function (id) {
  const params = new URLSearchParams()
  params.append('id', id)
  if (localStorage.getItem('Username')) {
    params.append('user', localStorage.getItem('Username'))
  }
  return request.get('/data/UpreadNum', { params })
}

export default {
  getArchives,
  UpdatedReadNum,
  getPageData
}
