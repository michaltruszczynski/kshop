import axios from 'axios';
import { store } from '../store/store'

import { tokenService } from '../utility/auth';
import { authService } from '../services/authService';
import { isDev } from '../utility/helpers';

import { logout } from '../store/actions'

const { dispatch } = store;

const API_URL =  isDev() ? 'http://localhost:5000/api' : process.env.REACT_APP_API_URL;

console.log(process.env.NODE_ENV)

export const axiosInstance = axios.create({
      baseURL: API_URL
});

axiosInstance.interceptors.request.use(
      (config) => {
            const token = tokenService.getAccessToken();
            const refreshToken = tokenService.getRefreshToken();
            if (token && refreshToken) {
                  config.headers["x-access-token"] = token;
            }
            return config;
      },
      (error) => {
            return Promise.reject(error);
      }
);

axiosInstance.interceptors.response.use(
      (response) => {
            return response;

      }, async (error) => {
            const originalError = error;
            const originalConfig = error.config;

            if (originalConfig.url !== '/admin/signin' && error.response) {

                  if (error.response.status === 401 && originalConfig.url === '/admin/newtoken') {
                        dispatch(logout())
                        return Promise.reject(originalError);
                  }

                  if (error.response.status === 401 && !originalConfig.retry) {
                        originalConfig.retry = true;
                        try {
                              const response = await authService.newToken();
                              return axiosInstance(originalConfig);
                        } catch (err) {
                              return Promise.reject(err);
                        }
                  }

                  return Promise.reject(error);
            }
            return Promise.reject(error);
      }
);