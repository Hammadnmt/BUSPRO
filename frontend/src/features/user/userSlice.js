/* eslint-disable no-unused-vars */
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllusers: builder.query({
      query: () => ({
        url: "/user/",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response, meta, arg) => response.data,
    }),
    getPaginatedUsers: builder.query({
      query: ({ page, limit }) => ({
        url: `/user/user/?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response, meta, arg) => response.data,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
      transformResponse: (response, meta, arg) => response.data,
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response, meta, arg) => {
        // console.log(response.data);
        return response.data;
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response, meta, arg) => console.log(response),
    }),
  }),
});

export const {
  useGetAllusersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetPaginatedUsersQuery,
} = userApi;
