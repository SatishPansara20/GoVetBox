import { createSlice } from "@reduxjs/toolkit";
import { API_IMAGE } from "../constants";
import { v4 as uuid } from "uuid";

import {
  API_GET_APPPROVED_PATIENT_LIST,
  GET_APPPROVED_PATIENT_LIST_S,
  GET_APPPROVED_PATIENT_LIST_F,
  API_GET_PATIENT_DETAIL,
  GET_PATIENT_DETAIL_S,
  GET_PATIENT_DETAIL_F,
  API_EDIT_PATIENT,
  EDIT_PATIENT_S,
  EDIT_PATIENT_F,
} from "../constants";

const initialState = {
  approvedPatientList: [],
  patientInfo: {},
  editPatientInfo: {},
};

export const getApprovedPatientList = (data) => ({
  type: "API",
  payload: {
    url: API_GET_APPPROVED_PATIENT_LIST,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: GET_APPPROVED_PATIENT_LIST_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_APPPROVED_PATIENT_LIST_F,
      payload: data,
    }),
  },
});

export const getPatientDetail = (data) => ({
  type: "API",
  payload: {
    url: API_GET_PATIENT_DETAIL,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: GET_PATIENT_DETAIL_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_PATIENT_DETAIL_F,
      payload: data,
    }),
  },
});

export const editPatient = (data) => ({
  type: "API",
  payload: {
    url: API_EDIT_PATIENT,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: EDIT_PATIENT_S,
      payload: data,
    }),
    error: (data) => ({
      type: EDIT_PATIENT_F,
      payload: data,
    }),
  },
});

// Reducer
const PatientManagementSlice = createSlice({
  name: "patientmanagement",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //NOTE: GET_APPPROVED_PATIENT_LIST_
    builder.addCase(GET_APPPROVED_PATIENT_LIST_S, (state, action) => {
      state.patientInfo = {};
      state.approvedPatientList = [];
      const response = action.payload;
      if (response?.status === 200) {
        response?.data?.data?.map((patient) => {
          return state.approvedPatientList.push({
            ...patient,
            key: uuid(),
            image: `${API_IMAGE}patient/${patient.image}`,
          });
        });
      }
    });
    builder.addCase(GET_APPPROVED_PATIENT_LIST_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${GET_APPPROVED_PATIENT_LIST_F} : ${action.payload}`
      );
      state.approvedPatientList = [];
    });

    //NOTE: GET_PATIENT_DETAIL
    builder.addCase(GET_PATIENT_DETAIL_S, (state, action) => {
      state.patientInfo = {};

      const response = action.payload;
      if (response?.status === 200) {
        const newData = Object.assign(response?.data, {
          image: `${API_IMAGE}patient/${response.data?.image}`,
        });
        state.patientInfo = Object.assign(response, { data: newData });
      }
    });
    builder.addCase(GET_PATIENT_DETAIL_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${GET_PATIENT_DETAIL_F} : ${action.payload}`
      );
      state.patientInfo = {};
    });

    //NOTE: EDIT_PATIENT
    builder.addCase(EDIT_PATIENT_S, (state, action) => {
      state.editPatientInfo = {};
      const response = action.payload;
      state.editPatientInfo = {};
      if (response?.status === 200) {
        state.editPatientInfo = response;
      }
    });
    builder.addCase(EDIT_PATIENT_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${EDIT_PATIENT_F} : ${action.payload}`
      );
      state.editPatientInfo = {};
    });
  },
});

export const approvedPatientList = (state) =>
  state.patientmanagement.approvedPatientList;
export const patientInfo = (state) => state.patientmanagement.patientInfo;
export const editPatientInfo = (state) =>
  state.patientmanagement.editPatientInfo;

// export const { transformGetShipmentData } = PatientManagementSlice.actions;
export default PatientManagementSlice.reducer;
