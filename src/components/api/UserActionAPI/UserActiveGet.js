import requst from '../../requst/requst'
// 进行点赞 收藏 评论
const UserActive = function (data) {
  const params = new URLSearchParams()
  params.append('username', data.username)
  params.append('articleid', data.articleid)
  params.append('actmenthos', data.actmenthos)
  if (data.comment) {
    if (data.comment.length) {
      params.append('comment', data.comment)
    }
  }
  return requst.get('/users/action', { params })
}
// 获取点赞 收藏 评论
const UserActivedata = function (user) {
  return requst.get('/users/actdata?user=' + user)
}
// 取消 点赞 收藏 评论
const UserActiveDel = function (data) {
  console.log(data)
  const params = new URLSearchParams()
  params.append('id', data.id)
  params.append('username', data.username)
  params.append('article_id', data.article_id)
  return requst.get('/users/delact', { params })
}

export default {
  UserActive,
  UserActivedata,
  UserActiveDel
}
