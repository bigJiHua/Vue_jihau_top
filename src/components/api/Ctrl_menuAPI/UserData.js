import request from '../../requst/requst'
// 获取用户信息
const GetUserData = function (username) {
  const params = new URLSearchParams()
  params.append('username', username)
  return request.get('/users/' + username)
}
// 新增用户
const UpnewUser = function (userdata) {
  const params = new URLSearchParams()
  params.append('username', userdata.username)
  params.append('password', userdata.password)
  params.append('email', userdata.email)
  if (userdata.birthday) {
    params.append('birthday', userdata.birthday)
  } else if (userdata.sex) {
    params.append('sex', userdata.sex)
  } else if (userdata.city) {
    params.append('city', userdata.city)
  } else if (userdata.my_content) {
    params.append('my_content', userdata.my_content)
  } else if (userdata.user_pic) {
    params.append('user_pic', userdata.user_pic)
  }
  return request.post('/my/reguser', params)
}
// 删除用户
const DelUser = function (user) {
  return request('/users/delUser?user=' + user)
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
  return request.patch('/users/cagUser', params)
}
export default {
  GetUserData,
  CagUserData,
  UpnewUser,
  DelUser
}
