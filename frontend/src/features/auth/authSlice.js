/* eslint-disable no-unused-vars */
import { baseApi } from "../baseApi";
import { createSlice } from "@reduxjs/toolkit";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        credentials: "include",
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response, meta, arg) => {
        delete response.status;
        localStorage.setItem("user", JSON.stringify(response));
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
    registerUser: builder.mutation({
      query: (userdata) => ({
        url: "/auth/signup",
        method: "POST",
        body: userdata,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      transformResponse: (response, meta, arg) => {
        localStorage.removeItem("user");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
  }),
});

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
