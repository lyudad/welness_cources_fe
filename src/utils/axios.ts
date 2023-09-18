import Cookie from 'js-cookie'
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

instance.interceptors.request.use(
  config => {
    const token = Cookie.get('accessToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
