import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";

type prepareHeaders = (
  headers: Headers,
  api: {
    getState: () => unknown;
    extra: unknown;
    endpoint: string;
    type: "query" | "mutation";
    forced: boolean | undefined;
  }
) => Headers | void;

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/login/",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ["Posts", "User", "Notifications"],
    }),
  }),
});

export const { useLoginMutation } = todoApi;
