import * as actionTypes from './actionTypes';

import { authService } from '../../services/authService';

import { ErrorMessage } from '../../utility/helpers';

export const authSigninStart = () => {
      return {
            type: actionTypes.AUTH_SIGNIN_START
      }
}

export const authSigninSuccess = (token, userId, userRole, userName, userEmail, orders) => {
      return {
            type: actionTypes.AUTH_SIGNIN_SUCCESS,
            token: token,
            userId: userId,
            userRole: userRole,
            userName: userName,
            userEmail: userEmail,
            orders: orders
      }
}

export const authSigninFail = (error) => {
      return {
            type: actionTypes.AUTH_SIGNIN_FAIL,
            error: error
      }
}

export const authCheck = () => {
      return async dispatch => {
            dispatch(authSigninStart());
            try {
                  const response = await authService.checkUser();
                  const { userId, token, userRole, userName, userEmail, orders } = response.data;
                  dispatch(authSigninSuccess(token, userId, userRole, userName, userEmail, orders));
            } catch (error) {
                  const errorMsg = new ErrorMessage(error);
                  dispatch(authSigninFail(errorMsg.getErrorObject()));
            }
      }
}

export const logout = () => {
      authService.logout();
      return {
            type: actionTypes.AUTH_LOGOUT
      }
}

export const setRedirectPath = (redirectPath) => {
      return {
            type: actionTypes.SET_REDIRECT_PATH,
            redirectPath: redirectPath
      }
}