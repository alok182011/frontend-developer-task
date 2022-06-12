import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    id: null,
    token: null,
  },
  reducers: {
    userLogin: (state, action) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.username = null;
      state.id = null;
      state.token = null;
    },
  },
});

export const { userLogin, logout } = userSlice.actions;

export default userSlice.reducer;
