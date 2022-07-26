import request from '../../request/request'

const getUserinfo = function (user, n) {
  return request.get('/users/getUinfo?user=' + user + '&n=' + n)
}
export default {
  getUserinfo
}
