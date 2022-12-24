import request from './request'
// 首页获取轮播和发展历程
const getSetting = function (val) {
  return request.get('/data/Setting?value=' + val)
}
// 设置获取轮播
const getSettingLunbo = function (met, username, data) {
  const params = new URLSearchParams()
  params.append('met', met)
  params.append('username', username)
  if (met === 'cag') {
    params.append('data', data)
  }
  return request.post('/setting/Lunbo', params)
}
// 设置获取发展历程
const getSettingDevP = function (met, username, data) {
  const params = new URLSearchParams()
  params.append('met', met)
  params.append('username', username)
  if (met === 'cag' || met === 'add' || met === 'del') {
    params.append('data', data)
  }
  return request.post('/setting/DevP', params)
}
// 设置获取赞助鸣谢名单
const getSettingSpsList = function (met, username, data) {
  const params = new URLSearchParams()
  params.append('met', met)
  params.append('username', username)
  if (met === 'cag' || met === 'add' || met === 'del') {
    params.append('data', data)
  }
  return request.post('/setting/SpsList', params)
}
export default {
  getSetting,
  getSettingLunbo,
  getSettingDevP,
  getSettingSpsList
}
