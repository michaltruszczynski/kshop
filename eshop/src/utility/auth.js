class TokenService {
      getRefreshToken() {
            return JSON.parse(localStorage.getItem('refreshToken'));
      }

      getAccessToken() {
            // console.log(JSON.parse(localStorage.getItem('token')));
            console.log(localStorage.getItem('token'))
            return JSON.parse(localStorage.getItem('token'));
      }

      updateAccessToken(token) {
            localStorage.setItem('token', JSON.stringify(token));
      }

      updateRefreshToken(refreshToken) {
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      }

      removeTokens() {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
      }
}

class LocalStorageService {
      setUserId(userId) {
            localStorage.set('userId'.userId)
      }

}

export const tokenService = new TokenService();
export const localStorageService = new LocalStorageService()