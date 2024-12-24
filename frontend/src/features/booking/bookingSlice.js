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
      query: (userdata) => ({
        url: "/booking/",
        method: "GET",
      }),
      transformErrorResponse: (response, meta, arg) => {
        console.log(response.data);
      },
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/booking/:${id}`,
        method: "DELETE",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/booking/:${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
  useGe,
} = bookApi;
