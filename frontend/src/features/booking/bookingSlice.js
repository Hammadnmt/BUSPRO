/* eslint-disable no-unused-vars */
import { baseApi } from "../baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/booking/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getBookings: builder.query({
      query: () => ({
        url: "/booking/",
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/booking/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getBookingByUserId: builder.query({
      query: (id) => ({
        url: `/booking/user/${id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getBookingsByTripId: builder.query({
      query: (id) => ({
        url: `/booking/trip/${id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
  useGetBookingByUserIdQuery,
  useGetBookingsByTripIdQuery,
} = bookApi;
