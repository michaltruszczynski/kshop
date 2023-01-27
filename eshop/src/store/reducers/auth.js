import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/helpers';

const asyncStatusType = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const initialState = {
      userId: null,
      userRole: null,
      userName: null,
      userEmail: null,
      orders: null,
      token: null,
      error: false,
      redirectPath: null,
      asyncOperation: asyncStatusType.IDLE
}

const authSigninStart = (state, action) => {
      return updateObject(state, {
            error: false,
            asyncOperation: asyncStatusType.LOADING
      });
}

const authSigninSuccess = (state, action) => {
      const { userId, token, userRole, userName, userEmail, orders } = action;
      return updateObject(state, {
            userId: userId,
            userRole: userRole,
            userName: userName,
            userEmail: userEmail,
            orders: orders,
            token: token,
            asyncOperation: asyncStatusType.SUCCESS
      });
}

const authSigninFail = (state, action) => {
      const { error } = action;
      return updateObject(state, {
            userId: null,
            userRole: null,
            userName: null,
            userEmail: null,
            orders: null,
            token: null,
            error: error,
            asyncOperation: asyncStatusType.SUCCESS
      });
}

const authLogout = (state, action) => {
      return updateObject(state, {
            ...initialState,
            asyncOperation: asyncStatusType.SUCCESS
      })
}

const setRedirectPath = (state, action) => {
      const { redirectPath } = action;
      return updateObject(state, {
            redirectPath: redirectPath
      })
}

const reducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.AUTH_SIGNIN_START:
                  return authSigninStart(state, action);
            case actionTypes.AUTH_SIGNIN_SUCCESS:
                  return authSigninSuccess(state, action);
            case actionTypes.AUTH_SIGNIN_FAIL:
                  return authSigninFail(state, action);
            case actionTypes.AUTH_LOGOUT:
                  return authLogout(state, action);
            case actionTypes.SET_REDIRECT_PATH:
                  return setRedirectPath(state, action);
            default:
                  return state;
      }
}

export default reducer;