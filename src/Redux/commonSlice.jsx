import { createSlice } from "@reduxjs/toolkit";
import { t, t_s, t_f } from "../constants/index";

import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

const initialState = {
  token: "",
  sliderCollapsed: false,
  toastData: "",
  updateShipmentPayload: [],
  t_data: [],
};


// PUBLIC_URL= https://jsonplaceholder.typicode.com
// REACT_APP_API_BASE= https://jsonplaceholder.typicode.com


export const testAxios = (data) => ({
  type: "API",
  payload: {
    url: t,
    method: "GET",
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: t_s,
      payload: data,
    }),
    error: (data) => ({
      type: t_f,
      payload: {},
    }),
  },
});

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    transformGetShipmentData: {
      reducer(state, action) {
        if (action.payload.length > 0) {
          state.updateShipmentPayload = [];
          action.payload.map((shipment) => {
            return state.updateShipmentPayload.push({
              ...shipment,
              key: uuid(),
              deliveryDate: dayjs(shipment.deliveryDate).format("DD-MM-YYYY"),
              nextDeliveryDate: dayjs(shipment.nextDeliveryDate).format(
                "DD-MM-YYYY"
              ),
            });
          });
        }
      },
      // prepare(data) {
      //   const {
      //     addressId,
      //     deliveryDate,
      //     dosage,
      //     medicationId,
      //     nextDeliveryDate,
      //     patientId,
      //     trackUrl,
      //     _id,
      //   } = data;
      //   return {
      //     payload: {
      //       addressId,
      //       deliveryDate,
      //       dosage,
      //       medicationId,
      //       nextDeliveryDate,
      //       patientId,
      //       trackUrl,
      //       _id,
      //     },
      //   };
      // },
    },

    toggleSlider: (state) => {
      state.sliderCollapsed = !state.sliderCollapsed;
    },

    toastAction: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(t_s, (state, action) => {
      state.t_data = action.payload;
    });
    builder.addCase(t_f, (state, action) => {
      console.log(`ERROR WHILE EXECUTING ${t_f} : ${action.payload}`);
      state.t_data = [];
    });
  },
});

export const t_data = (state) => state.common.t_data;
export const valueofsider = (state) => state.common.sliderCollapsed;
export const toastData = (state) => state.common.toastData;
export const updateShipmentPayload = (state) =>
  state.common.updateShipmentPayload;
export const { transformGetShipmentData, toggleSlider, toastAction } =
  commonSlice.actions;
export default commonSlice.reducer;
