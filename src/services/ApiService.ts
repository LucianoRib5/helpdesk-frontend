import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:8080/api',
}

const api: AxiosInstance = axios.create(config)

const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return api.get<T>(url, config)
}

const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return api.post<T>(url, data, config)
}

const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return api.put<T>(url, data, config)
}

const del = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return api.delete<T>(url, config)
}

const ApiService = {
  get,
  post,
  put,
  del,
}

export default ApiService
