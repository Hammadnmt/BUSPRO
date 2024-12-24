import { configureStore } from "@reduxjs/toolkit";
import { baseApi, apiMiddleware } from "../features/baseApi";
// import { loggingAndDispatch } from "../middleware/logging";
import authReducer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiMiddleware),
});
