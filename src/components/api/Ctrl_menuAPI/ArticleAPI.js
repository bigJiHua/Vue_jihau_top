import requst from '../../requst/requst'

const UsergetArticle = function (username) {
  return requst.get('/article/' + username)
}
export default {
  UsergetArticle
}
