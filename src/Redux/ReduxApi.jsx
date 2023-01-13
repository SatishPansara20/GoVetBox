import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://202.131.117.92:7155/admin_v1/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["userData"],
  endpoints: (builder) => ({

    getDashboardata: builder.mutation({
      query: () => ({
        url: "/dashboard",
        method: "POST",
      }),
      invalidatesTags: ["userData"],
    }),
    getApprovedPatientList: builder.mutation({
      query: (data) => ({
        url: "/getApprovedPatientList",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userData"],
    }),

    getShipmentDetailURL: builder.mutation({
      query: (data) => ({
        url: "/getShipmentDetail",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userData"],
    }),

    getPatientAddressURL: builder.mutation({
      query: (data) => ({
        url: "/getPatientAddress",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userData"],
    }),

    getAllMedicationURL: builder.mutation({
      query: (data) => ({
        url: "/getAllMedication",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userData"],
    }),

    updateShipment: builder.mutation({
      query: (data) => ({
        url: "/updateShipment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userData"],
    }),


  }),
});

export const {
  useGetApprovedPatientListMutation,
  useGetShipmentDetailURLMutation,
  useGetPatientAddressURLMutation,
  useGetAllMedicationURLMutation,
  useGetDashboardataMutation,
  useUpdateShipmentMutation,
} = userAPI;
