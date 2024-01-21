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

export const fileApiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  Headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export default instance
