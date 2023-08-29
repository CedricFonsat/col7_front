import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "../../data/env";

export const collectionCardApi = createApi({
  reducerPath: "collectionCardApi",
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  endpoints: (builder) => ({
    getCollectionCards: builder.query({
      query: () => ({
        url: "/collection_cards/",
        method: "Get",
        headers: {
          accept: "application/json",
        },
      }),
    }),
    getCollectionCardsById: builder.query({
      query: (id) => ({ // Accept id as a parameter
        url: `/collection_cards/${id}/`, // Customize the URL with the id
        method: "Get",
        headers: {
          accept: "application/json",
        },
      }),
    }),
    getCollectionCardsComingSoon: builder.query({
      query: () => ({ // Accept id as a parameter
        url: '/collection_card/coming_out_soon',
        method: "Get",
        headers: {
          accept: "application/json",
        },
      }),
    }),
  }),
});

export const { useGetCollectionCardsQuery, useGetCollectionCardsByIdQuery, useGetCollectionCardsComingSoonQuery } = collectionCardApi;