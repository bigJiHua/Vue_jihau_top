import request from '../request'
// 进行点赞 收藏 评论
const UserActive = function (data) {
  console.log(data)
  const params = new URLSearchParams()
  params.append('username', data.username)
  params.append('articleid', data.articleid)
  params.append('type', data.type)
  if (data.comment && data.comment.length) {
    params.append('comment', data.comment)
  }
  return request.post('/users/action', params)
}
// 获取点赞 收藏 评论
const UserActivedata = function (user) {
  return request.get('/users/actdata?user=' + user)
}
// 取消 评论
const UserActiveDel = function (data) {
  const params = new URLSearchParams()
  params.append('id', data.id)
  params.append('username', data.username)
  params.append('article_id', data.article_id)
  return request.get('/users/delact', { params })
}
// 文章页面获取作者信息
const getAuthData = function (user) {
  return request.get('/data/authData?user=' + user)
}
export default {
  UserActive,
  UserActivedata,
  UserActiveDel,
  getAuthData
}
