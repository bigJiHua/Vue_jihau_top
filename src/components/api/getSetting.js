import requst from '../requst/requst'
// 首页获取文章
const getSetting = function (val) {
  console.log(val)
  return requst.get('/data/setting?value=' + val)
}
export default {
  getSetting
}
