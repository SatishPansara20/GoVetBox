import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
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
  },
  // extraReducers: (builder) => {
  //   builder.addCase();
  //   builder.addCase();
  // },
});

export const { addShipmentdataToCommonSlice } = commonSlice.actions;
export default commonSlice.reducer;
