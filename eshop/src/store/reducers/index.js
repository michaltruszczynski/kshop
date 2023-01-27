import { combineReducers } from 'redux';
import messageReducer from './message';
import cartReducer from './cart';
import authReducer from './auth';

const reducers = combineReducers({
      message: messageReducer,
      cart: cartReducer,
      auth: authReducer
});

export default reducers;