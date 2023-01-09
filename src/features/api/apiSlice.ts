import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";

interface Task {
  id: number;
  name: string;
  created_on: string;
  user: number;
  done: boolean;
}

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
  tagTypes: ["Tasks"],
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => "api/tasks/",
      extraOptions: {
        refetchOnMountOrArgChange: true,
      },
      providesTags: ["Tasks"],
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: "api/login/",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ["Posts", "User", "Notifications"],
    }),
  }),
});

export const { useGetTasksQuery, useLoginMutation } = todoApi;
