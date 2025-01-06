import { body } from "express-validator";
import { baseApi } from "../baseApi";

export const promoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromo: builder.query({
      query: (code) => ({
        url: `/promo/${code}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    createPromo: builder.mutation({
      query: (data) => ({
        url: `/promo/create`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
  }),
});
export const { useCreatePromoMutation, useLazyGetPromoQuery } = promoApi;
