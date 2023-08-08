import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Créer l'API en utilisant Redux Toolkit Query
export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
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
    
  }),
});

// Extrait les hooks pour utiliser les endpoints
export const { useGetCardsQuery, useBuyCardMutation, useBuyCardByIdMutation } = cardApi;
