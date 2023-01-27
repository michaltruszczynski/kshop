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
                  console.log('dupa: ', response.data)
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
            console.log('[authService] refresh token: ', refreshToken )
            const response = await axiosInstance.post('/admin/newtoken', {refreshToken});
            const { token: newToken, refreshToken: newRefreshToken } = response.data;
            tokenService.updateAccessToken(newToken);
            tokenService.updateRefreshToken(newRefreshToken);
            return Promise.resolve(response);
      } catch (error) {
            console.log('removing tokens')
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

// const API_URL = 'http://localhost:5000/api';

// const signupUser = (data) => {
//       return axios.post(`${API_URL}/admin/signup`, data);
// }

// const checkUser = () => {

//       const token = JSON.parse(localStorage.getItem('token'));
//       console.log(token)

//       if (!token) {
//             return Promise.reject(new Error('Token validation failed. Not authorised.'))
//       }

//       const expirationDate = new Date(JSON.parse(localStorage.getItem('expirationDate')))
//       const currentDate = new Date();

//       if (currentDate > expirationDate) {
//             console.log('currentDate > expirationDate')
//             return Promise.reject(new Error('Token validation failed. Token no longer valid.'))
//       }

//       const authHeader = { 'x-access-token': token }

//       return axios.get(`${API_URL}/admin/checkuser`,
//             { headers: authHeader });
// }

// const signinUser = async (data) => {

//       try {
//             const response = await axios.post(`${API_URL}/admin/signin`, data);
//             const { userId, token, expiresIn } = response.data;
//             if (userId && token && expiresIn) {
//                   console.log('dupa')
//                   const expirationDate = new Date(new Date().getTime() + expiresIn);
//                   localStorage.setItem('userId', JSON.stringify(userId));
//                   localStorage.setItem('token', JSON.stringify(token));
//                   localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
//             }
//             return Promise.resolve(response);
//       } catch (error) {
//             return Promise.reject(error);
//       }
// }

// const checkUser = () => {

//       const token = JSON.parse(localStorage.getItem('token'));
//       console.log(token)

//       if (!token) {
//             return Promise.reject(new Error('Token validation failed. Not authorised.'))
//       }

//       const expirationDate = new Date(JSON.parse(localStorage.getItem('expirationDate')))
//       const currentDate = new Date();

//       if (currentDate > expirationDate) {
//             console.log('currentDate > expirationDate')
//             return Promise.reject(new Error('Token validation failed. Token no longer valid.'))
//       }

//       const authHeader = { 'x-access-token': token }

//       return axiosInstance.get('/admin/checkuser',
//             { headers: authHeader });
// }