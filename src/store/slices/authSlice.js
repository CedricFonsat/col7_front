import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: async (headers) => {
      const user = await AsyncStorage.getItem("@token");
      if (user) {
        headers.set("authorization", `Bearer ${user}`);
      }
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login_check",
        method: "POST",
        body,
      }),
    }),
    me: builder.query({
      query: () => ({
        url: "/me",
        method: "Get",
      }),
    }),
    usersListHome: builder.query({
      query: () => ({
        url: "/home",
        method: "Get",
      }),
    }),
  }),
});

export const { useLoginUserMutation, useMeQuery, useUsersListHomeQuery } = authApi;
