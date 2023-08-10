import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "../../data/env";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
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
    login: builder.mutation({
      query: (body) => ({
        url: "/login_check",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    userImage: builder.mutation({
      query: (body) => ({
        url: "/users/upload/image",
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

export const { useLoginMutation, useRegisterMutation ,useMeQuery, useUsersListHomeQuery, useUserImageMutation } = authApi;
