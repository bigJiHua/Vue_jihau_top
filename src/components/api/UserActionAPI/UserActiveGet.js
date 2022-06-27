import requst from '../../requst/requst'

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

const UserActivedata = function (user) {
  return requst.get('/users/actdata?user=' + user)
}

export default {
  UserActive,
  UserActivedata
}
