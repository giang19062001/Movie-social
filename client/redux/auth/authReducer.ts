import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { ReduxTokens } from "@/types/auth";

// const initialState: ReduxTokens = {
//   user: {
//     _id: "",
//     name: "",
//     email: "",
//     password: "",
//     movie: [],
//     roles: [],
//     auth: "",
//     image: "",
//   },
//   tokens: {
//     accessToken: "",
//     refreshToken: "",
//   },
// };

const initialState: ReduxTokens = {
  user: null,
  tokens: null
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuth: (state, action : PayloadAction<ReduxTokens>) => {
      state.tokens = action.payload.tokens;
      state.user = action.payload.user;
    },
    removeAuth: (state) => {
      state.tokens = null
      state.user = null
    },

  },
  extraReducers: (builder) => {},
});

export const { saveAuth, removeAuth } = authSlice.actions;

export const selectTokens = (state: AppState) => state.auth.tokens;
export const selectUserCurrent = (state: AppState) => state.auth.user;

export default authSlice.reducer;
