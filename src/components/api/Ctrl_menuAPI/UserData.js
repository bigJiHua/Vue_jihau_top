import requst from '../../requst/requst'
// 获取用户信息
const GetUserData = function (username) {
  const params = new URLSearchParams()
  params.append('username', username)
  return requst.post('/users/', params)
}
// 新增用户
const UpnewUser = function (userdata) {
  const params = new URLSearchParams()
  params.append('username', userdata.username)
  params.append('password', userdata.password)
  params.append('email', userdata.email)
  params.append('birthday', userdata.birthday ? userdata.birthday : '')
  params.append('sex', userdata.sex ? userdata.sex : '男')
  params.append('city', userdata.city ? userdata.city : '')
  params.append('user_content', userdata.user_content ? userdata.user_content : '')
  params.append('user_pic', userdata.user_pic ? userdata.user_pic : '')
  return requst.post('/my/reguser', params)
}
// 删除用户
const DelUser = function (user, deluser) {
  return requst.get('/users/delUser?user=' + user + '&deluser=' + deluser)
}
// 修改用户信息
const CagUserData = function (data) {
  const params = new URLSearchParams()
  params.append('id', data.id)
  params.append('birthday', data.birthday)
  params.append('city', data.city)
  params.append('email', data.email)
  params.append('nickname', data.nickname)
  params.append('sex', data.sex)
  params.append('user_content', data.user_content)
  params.append('user_pic', data.user_pic)
  params.append('username', data.username)
  params.append('useridentity', data.useridentity)
  return requst.patch('/users/cagUser', params)
}
// 修改密码
const CagPassword = function (oldpwd, newpwd) {
  console.log(oldpwd, newpwd)
}
export default {
  GetUserData,
  CagUserData,
  UpnewUser,
  DelUser,
  CagPassword
}
