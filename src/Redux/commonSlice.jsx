import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

const initialState = {
  token: "",
  sliderCollapsed: false,
  toastData: "",
  updateShipmentPayload: [],
};

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
  // extraReducers: (builder) => {
  //   builder.addCase();
  //   builder.addCase();
  // },
});

export const valueofsider = (state) => state.common.sliderCollapsed;
export const toastData = (state) => state.common.toastData;
export const updateShipmentPayload = (state) =>
  state.common.updateShipmentPayload;
export const { transformGetShipmentData, toggleSlider, toastAction } =
  commonSlice.actions;
export default commonSlice.reducer;
