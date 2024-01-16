import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  Headers: {
    'Content-Type': 'application/json',
  },
})

export const apiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_URL,
  withCredentials: true,
  Headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
