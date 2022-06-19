import request from '../../requst/requst'
const LoginMenu = function (username, password) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return request.post('/my/login', params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}
export default {
  LoginMenu
}
