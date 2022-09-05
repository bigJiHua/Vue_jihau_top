import request from '@/components/request/request'

const checkVer = function (data) {
  const params = new URLSearchParams()
  params.append('code', data.code)
  params.append('user', data.user)
  return request.post('/getmail/checkEmail', params)
}

export default {
  checkVer
}
