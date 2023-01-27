import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/helpers';

const initialState = {
      message: '',
      messageDetails: [],
      confirmationMessage: '',
      confirmationResolver: null,
      type: null
}

const setMessage = (state, action) => {
      const {message, messageDetails } = action;
      return updateObject(state, {
            message: message,
            messageDetails: messageDetails,
            type: action.MessageTypes
      });
}

const clearMessage = (state, action) => {
      return updateObject(state, {
            ...initialState
      });
}

const requestConfirmation = (state, action) => {
      const { confirmationMessage, confirmationResolver} = action;
      return updateObject(state, {
            confirmationMessage: confirmationMessage,
            confirmationResolver: confirmationResolver
      })
}

const reducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.SET_MESSAGE: return setMessage(state, action);
            case actionTypes.CLEAR_MESSAGE: return clearMessage(state, action);
            case actionTypes.REQUEST_CONFIRMATION: return requestConfirmation(state, action);
            default: return state;
      }
}

export default reducer;