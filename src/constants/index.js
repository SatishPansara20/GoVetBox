// ENV CONSTANTS
export const { REACT_APP_API_BASE: API_BASE } = process.env;
export const { REACT_APP_NAME: APP_NAME } = process.env;

// LOCALSTORAGE KEYNAME
export const LS_USER = `user${APP_NAME}`;
export const LS_AUTHTOKEN = `authToken${APP_NAME}`;

// TYPES FOR REDUCER
export const LOGIN_S = `LOGIN_S`;
export const LOGIN_F = `LOGIN_F`;

export const USER_LIST_S = `USER_LIST_S`;
export const USER_LIST_F = `USER_LIST_F`;

export const USER_INFO_S = `USER_INFO_S`;
export const USER_INFO_F = `USER_INFO_F`;

// API ENDPOINTS
export const API_LOGIN = `auth/login`;

export const API_USER_LIST = `admin/userList`;
export const API_USER_INFO = `admin/userInfo`;

//NOTE: URL

// UI
// http://202.131.117.92:7155/admin/dashboard
// admin.gvb@yopmail.com
// 123456

// postman link 
// https://api.postman.com/collections/10507983-98316dce-12c9-4821-af69-60ef84f288d2?access_key=PMAT-01GP081M2VYJ46E5QBECXY26C5


// https://api.postman.com/collections/10507983-98316dce-12c9-4821-af69-60ef84f288d2?access_key=PMAT-01GP081M2VYJ46E5QBECXY26C5
// https://api.postman.com
// REACT_APP_API_BASE=http://202.131.117.92:7155/admin_v1/
// REACT_APP_IMAGE_BASE=http://202.131.117.92:7155/uploads/            