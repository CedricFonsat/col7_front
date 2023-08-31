import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from "../../data/env";

// Créer l'API en utilisant Redux Toolkit Query
export const homeApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
    prepareHeaders: async (headers) => {
      const user = await AsyncStorage.getItem("@token");
      if (user) {
        headers.set('Authorization', `Bearer ${user}`);
      }
      headers.set('Accept', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getDisplayHome: builder.mutation({
      query: (query) => ({ // Accept id as a parameter
        url: `/home`, // Customize the URL with the id
        method: 'POST',
        body: query,
        headers: {
          accept: "application/json",
        },
      }),
    }),  
  }),
});

// Extrait les hooks pour utiliser les endpoints
export const { useGetCardsQuery } = homeApi;
