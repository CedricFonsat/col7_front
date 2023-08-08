import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collectionCardApi = createApi({
  reducerPath: "collectionCardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
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
  }),
});

export const { useGetCollectionCardsQuery, useGetCollectionCardsByIdQuery } = collectionCardApi;