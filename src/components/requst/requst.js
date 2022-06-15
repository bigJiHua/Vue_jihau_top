import axios from 'axios'
const token = localStorage.getItem('token')
const request = axios.create({
  baseURL: 'http://127.0.0.1',
  timeout: 60 * 1000,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: token
  }
})

export default request
