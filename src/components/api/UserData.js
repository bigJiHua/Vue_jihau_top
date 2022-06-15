import request from '../requst/requst'
const GetUserData = function (username) {
  const params = new URLSearchParams()
  params.append('username', username)
  return request.get('/users/' + username)
}

export default {
  GetUserData
}
