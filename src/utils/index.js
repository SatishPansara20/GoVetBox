import { LOGIN_F, LOGIN_S, LS_AUTHTOKEN, LS_USER } from "../constants";

//To concate the path for the public folder
export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;

// Fun used for setting up the common header for axios through out the app and rehydrate the redux store
export const setupAxios = (axios, store) => {
  //const token = JSON.parse(localStorage.getItem(LS_AUTHTOKEN));
  //const userData = JSON.parse(localStorage.getItem(LS_USER));

  // const token = localStorage.getItem(LS_AUTHTOKEN);
  // const userData = localStorage.getItem(LS_USER);

  const loadFromLocalStorage = (data) => {
    try {
      const result = data;
      return result ? JSON.parse(result) : undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  // It's used to rehydrate redux auth data when page is refreshed
  if (loadFromLocalStorage(localStorage.getItem(LS_AUTHTOKEN))) {
    store.dispatch({
      type: LOGIN_S,
      payload: { data: loadFromLocalStorage(localStorage.getItem(LS_USER)) },
    });
  } else {
    store.dispatch({ type: LOGIN_F, payload: {} });
  }

  // It's used to intercept all the axios api response
  axios.interceptors.response.use(null, (err) => {
    if (err.response) {
      if (err.response.status === 403) {
        store.dispatch({ type: LOGIN_F });

        return Promise.reject(err);
      } else return Promise.reject(err);
    } else if (err.request) {
      return Promise.reject({
        response: {
          data: {
            message: "Something went wrong, Please try again later!!!",
          },
        },
      });
    }
  });
};

// Encrypt Function
export const encrypt = (param) => {
  if (param) return btoa(param);
  else return "";
};

// Decrypt Function
export const decrypt = (param) => {
  if (param) return atob(param);
  else return "";
};

// Debouncing for input search
export const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};
