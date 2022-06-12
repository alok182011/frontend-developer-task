import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "reduxjs-toolkit-persist";

import storage from "reduxjs-toolkit-persist/lib/storage";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";

import userReducer from "./features/userSlice";

const persistConfig = {
  key: "root",
  storage: storage,
};

const reducers = combineReducers({
  user: userReducer,
  //   sidebar: sidebarReducer,
  //   bar: barsReducer,
});

export const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
