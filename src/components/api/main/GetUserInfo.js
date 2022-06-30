import requst from '../../requst/requst'

const getUserinfo = function (user, n) {
  return requst.get('/users/getUinfo?user=' + user + '&n=' + n)
}
export default {
  getUserinfo
}
