import axios from 'axios'
import store from 'store-js'
import { BASE_URL } from '../constants'

const instance = axios.create({
  baseURL: BASE_URL,
})

instance.interceptors.request.use(
  function(config) {
    const user = store.get('user', null) ? JSON.parse(store.get('user', null)) : {}

    config.headers['Authorization'] = 'Bearer ' + user.token || ''
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

export default instance
