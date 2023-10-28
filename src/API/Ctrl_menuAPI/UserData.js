import request from '../request'
// 获取用户信息
const GetUserData = function () {
  const user = localStorage.getItem('Username')
  return request.get('/users/?user=' + user)
}
// 新增用户
const UpnewUser = function (userdata) {
  const params = new URLSearchParams()
  params.append('username', userdata.username)
  params.append('password', userdata.password)
  params.append('email', userdata.email)
  return request.post('/my/reguser', params)
}
// 删除用户
const DelUser = function () {
  return request.get('/users/delUser')
}
// 修改用户信息
const CagUserData = function (userId, data) {
  const params = new URLSearchParams()
  params.append('user_id', userId)
  params.append('setData', JSON.stringify(data))
  return request.patch('/users/cagUser', params.toString())
}
// 修改密码
const CagPassword = function (oldpwd, newpwd) {
  const params = new URLSearchParams()
  params.append('oldpwd', oldpwd)
  params.append('newpwd', newpwd)
  params.append('username', localStorage.getItem('Username'))
  return request.patch('/users/cagpwd', params)
}
export default {
  GetUserData,
  CagUserData,
  UpnewUser,
  DelUser,
  CagPassword
}
