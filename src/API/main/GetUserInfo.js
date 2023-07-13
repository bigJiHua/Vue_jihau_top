import request from '../request'

// 控制面板获取用户信息
const getUserinfo = function (user, n) {
  return request.get('/users/getUinfo?user=' + user + '&n=' + n)
}
export default {
  getUserinfo
}
