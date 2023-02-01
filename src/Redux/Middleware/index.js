import axios from "axios";
import { API_BASE } from "../../constants";
import { loaderChange } from "../AuthSlice";
import { useQuery } from "react-query";

const reduxApiMiddleware = (store) => (next) => (action) => {
  if (next) next(action);

  const { type, payload } = action;

  if (type === "API") {
    const {
      url,
      data,
      success,
      error,
      hideLoader = false,
      headers,
      method = "get",
    } = payload;

    if (!hideLoader) {
      store.dispatch(loaderChange(true));


      return axios({
        baseURL: API_BASE,
        method,
        url,
        data,
        headers,
      })
        .then((res) => {
          store.dispatch(loaderChange(false));

          if (success) {
            return store.dispatch(success(res.data));
          }

          return Promise.resolve(res.data);
        })
        .catch((err) => {
          store.dispatch(loaderChange(false));
          if (error) store.dispatch(error(err));

          return Promise.reject(err.response?.data);
        });
    }
  }
};

export default reduxApiMiddleware;
