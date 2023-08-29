import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from "../../data/env";

// Créer l'API en utilisant Redux Toolkit Query
export const cardApi = createApi({
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
    getCards: builder.query({
      query: () => "/cards/",
      method: "GET",
    }),
    buyCardById: builder.mutation({
      query: (rest) => {
        const { id } = rest; // Déplacer la déclaration de la variable id ici
        return {
          url: `/buy/${id}`,
          method: 'POST',
          body: rest,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    searchCard: builder.mutation({
      query: (rest) => {
        return {
          url: '/cards/search',
          method: 'POST',
          body: rest,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    getSearchCards: builder.query({
      query: (query) => ({ // Accept id as a parameter
        url: `/cards/${query}/`, // Customize the URL with the id
        method: "Get",
        headers: {
          accept: "application/json",
        },
      }),
    }),
    
  }),
});

// Extrait les hooks pour utiliser les endpoints
export const { useGetCardsQuery, useBuyCardMutation, useBuyCardByIdMutation, useSearchCardMutation } = cardApi;
