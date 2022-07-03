import requst from '../requst/requst'
// 首页获取轮播
const getSetting = function (val) {
  console.log(val)
  return requst.get('/data/Lunbo?value=' + val)
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
export default {
  getSetting,
  getSettingLunbo
}
