import { axiosInstance } from './api';

import { tokenService } from '../utility/auth';

const signupUser = (data) => {
      return axiosInstance.post('/admin/signup', data);
}

const signinUser = async (data) => {
      try {
            const response = await axiosInstance.post('/admin/signin', data);
            const { userId, token, refreshToken } = response.data;
            if (userId && token && refreshToken) {
                  localStorage.setItem('userId', JSON.stringify(userId));
                  localStorage.setItem('token', JSON.stringify(token));
                  localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
            }
            return Promise.resolve(response);
      } catch (error) {
            return Promise.reject(error);
      }
}

const checkUser = async () => {
      try {
            const response = await axiosInstance.get('/admin/checkuser')
            const { userId, token: checkedToken } = response.data;
            localStorage.setItem('userId', JSON.stringify(userId));
            localStorage.setItem('token', JSON.stringify(checkedToken));
            return Promise.resolve(response);
      } catch (error) {
            return Promise.reject(error);
      }
}

const logout = () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
}

const newToken = async () => {
      try {
            const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
            // if (!refreshToken) {
            //       const error
            //       return Promise.reject()
            // }
            const response = await axiosInstance.post('/admin/newtoken', {refreshToken});
            const { token: newToken, refreshToken: newRefreshToken } = response.data;
            tokenService.updateAccessToken(newToken);
            tokenService.updateRefreshToken(newRefreshToken);
            return Promise.resolve(response);
      } catch (error) {
            tokenService.removeTokens();
            return Promise.reject(error);
      }
}

export const authService = {
      signupUser,
      signinUser,
      checkUser,
      logout,
      newToken
}