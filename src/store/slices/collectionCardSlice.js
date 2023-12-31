import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "../../data/env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const collectionCardApi = createApi({
  reducerPath: "collectionCardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
    prepareHeaders: async (headers) => {
      const user = await AsyncStorage.getItem("@token");
      if (user) {
        headers.set("Authorization", `Bearer ${user}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCollectionCards: builder.query({
      query: () => ({
        url: "/collection_cards",
        method: "Get",
        headers: {
          accept: "application/json",
        },
      }),
    }),
    getCollectionCardsById: builder.query({
      query: (id) => ({
        // Accept id as a parameter
        url: `/collection_cards/${id}`, // Customize the URL with the id
        method: "Get",
        headers: {
          accept: "application/json",
        },
      }),
    }),
    getCollectionCardsComingSoon: builder.query({
      query: () => ({
        // Accept id as a parameter
        url: "/collection_card/coming_out_soon",
        method: "Get",
        headers: {
          accept: "application/json",
        },
      }),
    }),
    getHome: builder.query({
      query: () => ({
        url: "/home",
        method: "Get",
        headers: {
          accept: "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetCollectionCardsQuery,
  useGetCollectionCardsByIdQuery,
  useGetCollectionCardsComingSoonQuery,
  useGetHomeQuery,
} = collectionCardApi;
