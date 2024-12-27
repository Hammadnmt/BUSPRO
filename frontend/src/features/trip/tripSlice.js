/* eslint-disable no-unused-vars */
import { baseApi } from "../baseApi";

const tripApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTrip: builder.mutation({
      query: (data) => ({
        url: "/trip/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getTrips: builder.query({
      query: () => ({
        url: "/trip/",
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getTripById: builder.query({
      query: (id) => ({
        url: `/trip/${id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getTripByRoute: builder.query({
      query: ({ to, from, date }) => ({
        url: `/trip/search?to=${to}&from=${from}&date=${date}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    deleteTrip: builder.mutation({
      query: (id) => ({
        url: `/trip/:${id}`,
        method: "DELETE",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    updateTrip: builder.mutation({
      query: ({ id, data }) => ({
        url: `/trip/:${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
  }),
});

export const {
  useCreateTripMutation,
  useGetTripsQuery,
  useGetTripByIdQuery,
  useDeleteTripMutation,
  useUpdateTripMutation,
  useLazyGetTripByRouteQuery,
} = tripApi;
