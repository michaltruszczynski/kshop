import { useEffect, useReducer } from "react";
import { ErrorMessage } from "../utility/helpers";
import { axiosInstance } from "../services/api";

const reducer = (state, action) => {
   switch (action.type) {
      case "loading":
         return {
            ...state,
            status: "loading",
            // data: null,
            error: false,
         };
      case "success":
         return {
            ...state,
            status: "success",
            data: action.data,
         };
      case "error":
         return {
            ...state,
            status: "error",
            error: action.error,
         };
      default:
         return state;
   }
};

const initialState = {
   status: "idle",
   data: null,
   error: false,
};

const useFetch = (url) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      let isMounted = true;
     
      const controller = new AbortController();

      const fetchData = async (url) => {
         dispatch({ type: "loading" });
         try {
            const response = await axiosInstance.get(`${url}`, {
               signal: controller.signal
            });

            if (isMounted) {
               dispatch({ type: "success", data: response.data });
            }
         } catch (error) {
            if (isMounted) {
               const errorMsg = new ErrorMessage(error);
               dispatch({ type: "error", error: errorMsg });
            }
         }
      };

      if (url) {
         fetchData(url);
      }

      return () => {
         isMounted = false;
         controller.abort();
      };
   }, [url]);

   return [state];
};

export default useFetch;
