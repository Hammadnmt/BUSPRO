/* eslint-disable no-unused-vars */
import { baseApi } from "../baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBus: builder.mutation({
      query: (data) => ({
        url: "/bus/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getBuses: builder.query({
      query: () => ({
        url: "/bus/",
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    deleteBus: builder.mutation({
      query: (id) => ({
        url: `/bus/:${id}`,
        method: "DELETE",
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    updateBus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bus/:${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
  }),
});

export const {
  useCreateBusMutation,
  useGetBusesQuery,
  useDeleteBusMutation,
  useUpdateBusMutation,
} = bookApi;
