import { createSlice } from "@reduxjs/toolkit";

import {
  API_GET_MEDICATION_LIST,
  GET_MEDICATION_LIST_S,
  GET_MEDICATION_LIST_F,
  API_GET_MEDICATION_DETAILS,
  GET_MEDICATION_DETAILS_S,
  GET_MEDICATION_DETAILS_F,
  API_DELETE_MEDICATION,
  API_GET_SPECIES_LIST,
  GET_SPECIES_LIST_S,
  GET_SPECIES_LIST_F,
  API_GET_ALL_ADMINISTRATION_TYPE,
  GET_ALL_ADMINISTRATION_TYPE_S,
  GET_ALL_ADMINISTRATION_TYPE_F,
  API_GET_ALL_SIZE,
  GET_ALL_SIZE_S,
  GET_ALL_SIZE_F,
  API_GET_SIZE_LIST,
  GET_SIZE_LIST_S,
  GET_SIZE_LIST_F,
  DELETE_MEDICATION_S,
  DELETE_MEDICATION_F,
  API_ADD_MEDICATION,
  ADD_MEDICATION_S,
  ADD_MEDICATION_F,
} from "../constants";

const initialState = {
  medicationList: {},
  medicationDetail: {},
  speciesList: {},
  allAdministrationType: {},
  allSize: {},
  sizeList: {},
  addMedicationInfo: {},
  deleteMedicationInfo: {},
};

export const getMedicationList = (data) => ({
  type: "API",
  payload: {
    url: API_GET_MEDICATION_LIST,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: GET_MEDICATION_LIST_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_MEDICATION_LIST_F,
      payload: data,
    }),
  },
});

export const getMedicationDetail = (data) => ({
  type: "API",
  payload: {
    url: API_GET_MEDICATION_DETAILS,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: GET_MEDICATION_DETAILS_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_MEDICATION_DETAILS_F,
      payload: data,
    }),
  },
});

export const getSpeciesList = (data) => ({
  type: "API",
  payload: {
    url: API_GET_SPECIES_LIST,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: GET_SPECIES_LIST_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_SPECIES_LIST_F,
      payload: data,
    }),
  },
});

export const getAllAdministrationType = (data) => ({
  type: "API",
  payload: {
    url: API_GET_ALL_ADMINISTRATION_TYPE,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: GET_ALL_ADMINISTRATION_TYPE_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_ALL_ADMINISTRATION_TYPE_F,
      payload: data,
    }),
  },
});

export const getAllSize = (data) => ({
  type: "API",
  payload: {
    url: API_GET_ALL_SIZE,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: GET_ALL_SIZE_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_ALL_SIZE_F,
      payload: data,
    }),
  },
});

export const getSizeList = (data) => ({
  type: "API",
  payload: {
    url: API_GET_SIZE_LIST,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: GET_SIZE_LIST_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_SIZE_LIST_F,
      payload: data,
    }),
  },
});

export const addMedication = (data) => ({
  type: "API",
  payload: {
    url: API_ADD_MEDICATION,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: ADD_MEDICATION_S,
      payload: data,
    }),
    error: (data) => ({
      type: ADD_MEDICATION_S,
      payload: data,
    }),
  },
});

export const deleteMedication = (data) => {
  // for (const pair of data.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }

  return {
    type: "API",
    payload: {
      url: API_DELETE_MEDICATION,
      method: "POST",
      data: data,
      hideLoader: false,
      headers: { "Content-Type": "application/json" },
      success: (data) => ({
        type: DELETE_MEDICATION_S,
        payload: data,
      }),
      error: (data) => ({
        type: DELETE_MEDICATION_F,
        payload: data,
      }),
    },
  };
};

// Reducer
const MedicationManagementSlice = createSlice({
  name: "medicationmanagement",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //NOTE: GET_MEDICATION_LIST_S
    builder.addCase(GET_MEDICATION_LIST_S, (state, action) => {
      state.medicationDetail = {};
      state.medicationList = {};

      state.speciesList = {};
      state.allAdministrationType = {};
      state.allSize = {};
      state.sizeList = {};

      state.deleteMedicationInfo = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.medicationList = response;
      }
    });
    builder.addCase(GET_MEDICATION_LIST_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${GET_MEDICATION_LIST_F} : ${action.payload}`
      );
      state.medicationList = {};
    });

    //NOTE: GET_MEDICATION_DETAILS
    builder.addCase(GET_MEDICATION_DETAILS_S, (state, action) => {
      state.medicationDetail = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.medicationDetail = response;
      }
    });
    builder.addCase(GET_MEDICATION_DETAILS_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${GET_MEDICATION_DETAILS_F} : ${action.payload}`
      );
      state.medicationDetail = {};
    });

    //NOTE: GET_SPECIES_LIST
    builder.addCase(GET_SPECIES_LIST_S, (state, action) => {
      state.speciesList = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.speciesList = response;
      }
    });
    builder.addCase(GET_SPECIES_LIST_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${GET_SPECIES_LIST_F} : ${action.payload}`
      );
      state.speciesList = {};
    });

    //NOTE: GET_ALL_ADMINISTRATION_TYPE
    builder.addCase(GET_ALL_ADMINISTRATION_TYPE_S, (state, action) => {
      state.allAdministrationType = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.allAdministrationType = response;
      }
    });
    builder.addCase(GET_ALL_ADMINISTRATION_TYPE_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${GET_ALL_ADMINISTRATION_TYPE_F} : ${action.payload}`
      );
      state.allAdministrationType = {};
    });

    //NOTE: GET_ALL_SIZE
    builder.addCase(GET_ALL_SIZE_S, (state, action) => {
      state.allSize = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.allSize = response;
      }
    });
    builder.addCase(GET_ALL_SIZE_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${GET_ALL_SIZE_F} : ${action.payload}`
      );
      state.allSize = {};
    });

    //NOTE: GET_SIZE_LIST
    builder.addCase(GET_SIZE_LIST_S, (state, action) => {
      state.sizeList = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.sizeList = response;
      }
    });
    builder.addCase(GET_SIZE_LIST_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${GET_SIZE_LIST_F} : ${action.payload}`
      );
      state.sizeList = {};
    });

    //NOTE: ADD_MEDICATION
    builder.addCase(ADD_MEDICATION_S, (state, action) => {
      state.addMedicationInfo = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.addMedicationInfo = response;
      }
    });
    builder.addCase(ADD_MEDICATION_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${ADD_MEDICATION_F} : ${action.payload}`
      );
      state.addMedicationInfo = {};
    });

    //NOTE:  DELETE_MEDICATION
    builder.addCase(DELETE_MEDICATION_S, (state, action) => {
      state.deleteMedicationInfo = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.deleteMedicationInfo = response;
      }
    });
    builder.addCase(DELETE_MEDICATION_F, (state, action) => {
      state.deleteMedicationInfo = {};
      console.log(
        `ERROR WHILE EXECUTING ${DELETE_MEDICATION_F} : ${action.payload}`
      );
    });
  },
});

export const medicationList = (state) =>
  state.medicationmanagement.medicationList;
export const medicationDetail = (state) =>
  state.medicationmanagement.medicationDetail;
export const speciesList = (state) => state.medicationmanagement.speciesList;
export const allAdministrationType = (state) =>
  state.medicationmanagement.allAdministrationType;
export const allSize = (state) => state.medicationmanagement.allSize;
export const sizeList = (state) => state.medicationmanagement.sizeList;
export const addMedicationInfo = (state) =>
  state.medicationmanagement.addMedicationInfo;

export const deleteMedicationInfo = (state) =>
  state.medicationmanagement.deleteMedicationInfo;

// export const { transformGetShipmentData } = PatientManagementSlice.actions;
export default MedicationManagementSlice.reducer;
