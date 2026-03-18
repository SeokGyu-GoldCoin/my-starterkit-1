import axios from 'axios'

// 환경변수에서 API URL을 가져옴 (빈값이면 /api/mock 사용)
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/mock'

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)
