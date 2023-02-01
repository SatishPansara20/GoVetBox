// ENV CONSTANTS
export const { REACT_APP_API_BASE: API_BASE } = process.env;
export const { REACT_APP_NAME: APP_NAME } = process.env;
export const { REACT_APP_IMAGE_BASE: API_IMAGE } = process.env;

// LOCALSTORAGE KEYNAME
export const LS_USER = `user${APP_NAME}`;
export const LS_AUTHTOKEN = `authToken${APP_NAME}`;

// TYPES FOR REDUCER
export const LOGIN_S = `LOGIN_S`;
export const LOGIN_F = `LOGIN_F`;

export const FORGOT_PASSWORD_S = `FORGOT_PASSWORD_S`;
export const FORGOT_PASSWORD_F = `FORGOT_PASSWORD_F`;

export const USER_LIST_S = `USER_LIST_S`;
export const USER_LIST_F = `USER_LIST_F`;

export const USER_INFO_S = `USER_INFO_S`;
export const USER_INFO_F = `USER_INFO_F`;

export const DASHBOARD_S = `DASHBOARD_S`;
export const DASHBOARD_F = `DASHBOARD_F`;

export const GET_SHIPMENT_S = `GET_SHIPMENT_S`;
export const GET_SHIPMENT_F = `GET_SHIPMENT_F`;

export const GET_APPPROVED_PATIENT_LIST_S = `GET_APPPROVED_PATIENT_LIST_S`;
export const GET_APPPROVED_PATIENT_LIST_F = `GET_APPPROVED_PATIENT_LIST_F`;

export const GET_PATIENT_ADDRESS_S = `GET_PATIENT_ADDRESS_S`;
export const GET_PATIENT_ADDRESS_F = `GET_PATIENT_ADDRESS_F`;

export const GET_ALL_MEDICATIO_S = `GET_ALL_MEDICATION_S`;
export const GET_ALL_MEDICATIO_F = `GET_ALL_MEDICATION_F`;

export const GET_SHIPMENT_DETAIL_S = `GET_SHIPMENT_DETAIL_S`;
export const GET_SHIPMENT_DETAIL_F = `GET_SHIPMENT_DETAIL_F`;

export const ADD_SHIPMENT_S = `ADD_SHIPMENT_S`;
export const ADD_SHIPMENT_F = `ADD_SHIPMENT_F`;

export const UPDATE_SHIPMENT_S = `UPDATE_SHIPMENT_S`;
export const UPDATE_SHIPMENT_F = `UPDATE_SHIPMENT_F`;

export const DELETE_SHIPMENT_S = `DELETE_SHIPMENT_S`;
export const DELETE_SHIPMENT_F = `DELETE_SHIPMENT_F`;

export const GET_USER_LIST_S = `GET_USER_LIST_S`;
export const GET_USER_LIST_F = `GET_USER_LIST_F`;

export const GET_USER_DETAIL_S = `API_GET_USER_DETAIL_S`;
export const GET_USER_DETAIL_F = `API_GET_USER_DETAIL_F`;

export const UPDATE_USER_S = `UPDATE_USER_S`;
export const UPDATE_USER_F = `UPDATE_USER_F`;

export const DELETE_USER_S = `DELETE_USER_S`;
export const DELETE_USER_F = `DELETE_USER_F`;

export const BLOCKUNBLOCK_USER_S = `BLOCKUNBLOCK_USER_S`;
export const BLOCKUNBLOCK_USER_F = `BLOCKUNBLOCK_USER_F`;

export const GET_PATIENT_DETAIL_S = `GET_PATIENT_DETAIL_S`;
export const GET_PATIENT_DETAIL_F = `GET_PATIENT_DETAIL_F`;

export const EDIT_PATIENT_S = `EDIT_PATIENT_S`;
export const EDIT_PATIENT_F = `EDIT_PATIENT_F`;

export const GET_MEDICATION_LIST_S = `GET_MEDICATION_LIST_S`;
export const GET_MEDICATION_LIST_F = `GET_MEDICATION_LIST_F`;

export const GET_MEDICATION_DETAILS_S = `GET_ALL_MEDICATION_DETAILS_S`;
export const GET_MEDICATION_DETAILS_F = `GET_ALL_MEDICATION_DETAILS_F`;

export const GET_SPECIES_LIST_S = `GET_SPECIES_LIST_S`;
export const GET_SPECIES_LIST_F = `GET_SPECIES_LIST_F`;

export const GET_ALL_ADMINISTRATION_TYPE_S = `GET_ALL_ADMINISTRATION_TYPE_S`;
export const GET_ALL_ADMINISTRATION_TYPE_F = `GET_ALL_ADMINISTRATION_TYPE_F`;

export const GET_ALL_SIZE_S = `GET_ALL_SIZE_S`;
export const GET_ALL_SIZE_F = `GET_ALL_SIZE_F`;

export const GET_SIZE_LIST_S = `API_GET_SIZE_LIST_S`;
export const GET_SIZE_LIST_F = `API_GET_SIZE_LIST_F`;

export const ADD_MEDICATION_S = `ADD_MEDICATION_S`;
export const ADD_MEDICATION_F = `ADD_MEDICATION_F`;

export const DELETE_MEDICATION_S = `DELETE_MEDICATION_S`;
export const DELETE_MEDICATION_F = `DELETE_MEDICATION_F`;

// NOTE:API ENDPOINTS
export const API_LOGIN = `auth/login`;
export const API_FORGOT_PASSWORD = `/auth/forgotPassword`;

export const API_USER_LIST = `admin/userList`;
export const API_USER_INFO = `admin/userInfo`;

//Dashboard
export const API_DASHBOARD = `/api/dashboard`;

//ADD SHIPMENT
export const API_GET_APPPROVED_PATIENT_LIST = `/api/getApprovedPatientList`;
export const API_GET_PATIENT_ADDRESS = `/api/getPatientAddress`;
export const API_GET_ALL_MEDICATION = `/api/getAllMedication`;
export const API_GET_SHIPMENT = `/api/getShipment`;
export const API_GET_SHIPMENT_DETAIL = `/api/getShipmentDetail`;
export const API_ADD_SHIPMENT = `/api/addShipment`;
export const API_UPDATE_SHIPMENT = `/api/updateShipment`;
export const API_DELETE_SHIPMENT = `/api/deleteShipment`;

// USER MANAGEMENT
export const API_GET_USER_LIST = `/api/getUserList`;
export const API_GET_USER_DETAIL = `/api/getUserDetail`;
export const API_UPDATE_USER = `/api/updateUser`;
export const API_DELETE_USER = `/api/deleteUser`;
export const API_BLOCKUNBLOCK_USER = `/api/blockUnblockUser`;

// Patient Management

//1.API_GET_APPPROVED_PATIENT_LIST
export const API_GET_PATIENT_DETAIL = `/api/getPatientDetail`;
export const API_EDIT_PATIENT = `/api/editPatient`;

//Medication Management
export const API_GET_MEDICATION_LIST = `/api/getMedicationList`;
export const API_GET_MEDICATION_DETAILS = `/api/getMedicationDetail`;
export const API_GET_SPECIES_LIST = `/api/getSpeciesList`;
export const API_GET_ALL_ADMINISTRATION_TYPE = `/api/getAllAdministrationType`;
export const API_GET_ALL_SIZE = `/api/getAllSize`;
export const API_GET_SIZE_LIST = `/api/getSizeList`;
export const API_DELETE_MEDICATION = `/api/deleteMedication`;
export const API_ADD_MEDICATION = `/api/addMedication`;

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
