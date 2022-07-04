import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "reduxjs-toolkit-persist";

import storage from "reduxjs-toolkit-persist/lib/storage";

import userReducer from "./features/userSlice";

const persistConfig = {
  key: "root",
  storage: storage,
};

const reducers = combineReducers({
  user: userReducer,
});

export const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
