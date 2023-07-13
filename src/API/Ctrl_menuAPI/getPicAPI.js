import request from '../request'
// 获取图片
const getImage = function (data) {
  return request.post('/article/img', data)
}
// 上传图片
const upImage = function (file, user) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('username', user)
  return request.post('/article/upimg/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 删除图片
const delImage = function (data) {
  const params = new URLSearchParams()
  params.append('picusername', data.picusername)
  params.append('id', data.id)
  return request.post('/article/imgdel', params)
}

export default {
  getImage,
  upImage,
  delImage
}
