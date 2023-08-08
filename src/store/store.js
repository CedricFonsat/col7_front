import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cardApi } from "./slices/cardSlice";
import { authApi } from './slices/authSlice';
import { userApi } from "./slices/userSlice";
import { collectionCardApi } from "./slices/collectionCardSlice";

export const store = configureStore({
  reducer: {
    [cardApi.reducerPath]: cardApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [collectionCardApi.reducerPath]: collectionCardApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([cardApi.middleware, authApi.middleware, userApi.middleware, collectionCardApi.middleware]),
});

setupListeners(store.dispatch);
