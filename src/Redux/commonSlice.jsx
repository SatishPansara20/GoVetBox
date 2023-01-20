import { createSlice } from "@reduxjs/toolkit";

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
    addShipmentdataToCommonSlice: {
      reducer(state, action) {
        state.updateShipmentPayload.push(action.payload);
      },
      prepare(data) {
        const {
          addressId,
          deliveryDate,
          dosage,
          medicationId,
          nextDeliveryDate,
          patientId,
          trackUrl,
          _id,
        } = data;
        return {
          payload: {
            addressId,
            deliveryDate,
            dosage,
            medicationId,
            nextDeliveryDate,
            patientId,
            trackUrl,
            _id,
          },
        };
      },
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
export const { addShipmentdataToCommonSlice, toggleSlider, toastAction } =
  commonSlice.actions;
export default commonSlice.reducer;
