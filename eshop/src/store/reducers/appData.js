import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/helpers';

const initialState = {
      userId: null,
      userName: '',
      loading: false,
      error: null,
      cart: [],
      cartProductNumber: 0
}


const reducer = (state, action) => {
      switch (action.type) {
            case actionTypes:
                  return
            default:
                  return state;
      }
}
export default reducer;