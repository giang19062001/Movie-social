import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
}

export const store = makeStore();
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof store.getState>;

export default store
