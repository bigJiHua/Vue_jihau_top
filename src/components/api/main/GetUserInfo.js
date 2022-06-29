import requst from '../../requst/requst'

const getUserinfo = function (user) {
  return requst.get('/users/getUinfo?user=' + user)
}
export default {
  getUserinfo
}
