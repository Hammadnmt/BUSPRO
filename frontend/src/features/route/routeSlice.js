/* eslint-disable no-unused-vars */
import { baseApi } from "../baseApi";

export const routeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllroutes: builder.query({
      query: () => ({
        url: "/route/",
        method: "GET",
      }),
      providesTags: ["Route"], // Provide "Route" cache for all routes
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    createRoute: builder.mutation({
      query: (data) => ({
        url: "/route/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Route"], // Invalidate "Route" cache after creating a route
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    deleteRoute: builder.mutation({
      query: (id) => ({
        url: `/route/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Route"],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getRouteById: builder.query({
      query: (id) => ({
        url: `/route/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Route"],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    updateRoute: builder.mutation({
      query: ({ id, data }) => ({
        url: `/route/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Route"], // Invalidate cache for specific route ID
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetAllroutesQuery,
  useCreateRouteMutation,
  useGetRouteByIdQuery,
  useDeleteRouteMutation,
  useUpdateRouteMutation,
} = routeApi;
