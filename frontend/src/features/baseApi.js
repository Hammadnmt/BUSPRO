import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logout } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  credentials: "include",
});
const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  endpoints: () => ({}),
});

export const { reducer: apiReducer, middleware: apiMiddleware } = baseApi;
