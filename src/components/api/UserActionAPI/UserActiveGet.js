import requst from '../../requst/requst'

const UserActive = function (data) {
  console.log(data)
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

export default {
  UserActive
}
