import { useEffect, useReducer } from 'react';
import { ErrorMessage } from '../utility/helpers';
import { axiosInstance } from '../services/api';

const reducer = (state, action) => {
      switch (action.type) {
            case "loading":
                  return {
                        ...state,
                        status: "loading",
                        // data: null,
                        error: false
                  }
            case "success":
                  return {
                        ...state,
                        status: "success",
                        data: action.data
                  }
            case "error":
                  return {
                        ...state,
                        status: "error",
                        error: action.error
                  }
            default:
                  return state
      }
}

const initialState = {
      status: 'idle',
      data: null,
      error: false,
}

const useFetch = (url) => {
      const [state, dispatch] = useReducer(reducer, initialState);

      useEffect(() => {
            const fetchData = async () => {
                  dispatch({ type: 'loading' })
                  try {
                        const response = await axiosInstance.get(`${url}`)
                        dispatch({ type: 'success', data: response.data });
                  } catch (error) {
                        const errorMsg = new ErrorMessage(error);
                        dispatch({ type: 'error', error: errorMsg })
                  }
            };

            if (url) {
                  fetchData();
            }

      }, [url]);

      return [state];
}

export default useFetch;