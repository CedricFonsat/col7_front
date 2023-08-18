import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "../../data/env";

export const userApi = createApi({
  reducerPath: "userApi",
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
    usersHome: builder.query({
      query: () => ({
        url: "/home",
        method: "Get",
      }),
    }),
  }),
});

export const { useGetUsersHomeQuery } = userApi;
