import requst from '../requst/requst'
// 首页获取轮播和发展历程
const getSetting = function (val) {
  return requst.get('/data/Setting?value=' + val)
}
// 设置获取轮播
const getSettingLunbo = function (met, username, data) {
  const params = new URLSearchParams()
  params.append('met', met)
  params.append('username', username)
  if (met === 'cag') {
    params.append('data', data)
  }
  return requst.post('/setting/Lunbo', params)
}
// 设置获取发展历程
const getSettingDevP = function (met, username, data) {
  const params = new URLSearchParams()
  params.append('met', met)
  params.append('username', username)
  if (met === 'cag' || met === 'add' || met === 'del') {
    params.append('data', data)
  }
  return requst.post('/setting/DevP', params)
}
export default {
  getSetting,
  getSettingLunbo,
  getSettingDevP
}
