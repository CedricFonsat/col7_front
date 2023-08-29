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
    connexion: builder.mutation({
      query: (body) => ({
        url: "/connexion_user",
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: (rest) => {
        const { id } = rest;
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body: rest,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    userImage: builder.mutation({
      query: (body) => ({
        url: "/users/upload_image",
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
    deleteAccount: builder.query({
      query: (id) => ({ // Accept id as a parameter
        url: `/api/users/${id}`, // Customize the URL with the id
        method: "Delete",
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      }),
    usersListHome: builder.query({
      query: () => ({
        url: "/home",
        method: "Get",
      }),
    }),
    favoriteCard: builder.mutation({
      query: (rest) => {
        const { id, cardId } = rest; // Déplacer la déclaration de la variable id ici
        return {
          url: `/users/${id}/add_favorite/${cardId}`,
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

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useMeQuery,
  useUsersListHomeQuery,
  useUserImageMutation,
  useFavoriteCardMutation,
  useDeleteAccountQuery,
  useConnexionMutation
} = authApi;
