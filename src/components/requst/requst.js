import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.da4.cc/data'
})

export default request
