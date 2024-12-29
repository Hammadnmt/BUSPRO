/* eslint-disable no-unused-vars */
import { baseApi } from "../baseApi";

const busApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBus: builder.mutation({
      query: (data) => ({
        url: "/bus/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bus"], // Invalidate cache globally for all buses
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getBuses: builder.query({
      query: () => ({
        url: "/bus/",
        method: "GET",
      }),
      providesTags: ["Bus"], // Provide cache for all buses
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getBusById: builder.query({
      query: (id) => ({
        url: `/bus/${id}`,
        method: "GET",
      }),
      providesTags: ["Bus"],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    deleteBus: builder.mutation({
      query: (id) => ({
        url: `/bus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bus"],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    updateBus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bus/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Bus"],
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
  useGetBusByIdQuery,
} = busApi;
