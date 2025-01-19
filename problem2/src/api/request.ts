import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const setToken = (config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = 'Bearer dummyToken';
  }

  return config;
};

const request = (config: AxiosRequestConfig = {}) => {
  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.request.use(setToken);

  return axiosInstance;
};

export default request();
