

import axios, { type AxiosRequestConfig } from 'axios'

const AxiosConfig = () => {
    const AxiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    // Request interceptor
    AxiosInstance.interceptors.request.use(
        (config: AxiosRequestConfig | any) => {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // Response interceptor
    AxiosInstance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            // Handle response errors here
            if (error.response) {
                // Server responded with error status
                console.error('Response error:', error.response.status)
            } else if (error.request) {
                // Request was made but no response
                console.error('Request error:', error.request)
            } else {
                // Something else happened
                console.error('Error:', error.message)
            }
            return Promise.reject(error)
        }
    )

    return AxiosInstance
}

export default AxiosConfig