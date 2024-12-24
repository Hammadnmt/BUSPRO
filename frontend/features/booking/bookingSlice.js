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
      transformResponse: (response, meta, arg) => response.data.json(),
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getBookings: builder.query({
      query: () => ({
        url: "/booking/",
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        // Assuming response contains a `data` object that holds the desired data
        return response.data.json(); // Adjust if your API returns data differently
      },
      transformErrorResponse: (response, meta, arg) => {
        // Handle error transformations based on your API's error structure
        return response.data || { error: "An unknown error occurred." };
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
  useGetBookingsMutation,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} = bookApi;
