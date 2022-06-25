import requst from '../../requst/requst'

const UsergetArticle = function (username) {
  return requst.get('/article/?username=' + username)
}
const UseraddArticle = function (data) {
  const params = new URLSearchParams()
  params.append('username', data.username)
  params.append('title', data.title)
  params.append('content', data.content)
  params.append('cover_img', data.cover_img)
  params.append('lable', data.lable)
  params.append('keyword', data.keyword)
  return requst.post('/article/addart', params)
}
const UserdelArticle = function (id) {
  const params = new URLSearchParams()
  params.append('id', id)
  return requst.post('/article/delart', params)
}
const UsercagArticle = function (data) {
  const params = new URLSearchParams()
  params.append('id', data.id)
  params.append('username', data.username)
  params.append('title', data.title)
  params.append('content', data.content)
  params.append('cover_img', data.cover_img)
  params.append('lable', data.lable)
  params.append('keyword', data.keyword)
  params.append('article_id', data.article_id)
  return requst.post('/article/cagart', params)
}
export default {
  UseraddArticle,
  UsergetArticle,
  UserdelArticle,
  UsercagArticle
}
