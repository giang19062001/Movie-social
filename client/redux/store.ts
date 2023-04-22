import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import movieReducer from "./movie/movieReducer";
import authReducer from "./auth/authReducer";

export function makeStore() {
  return configureStore({
    reducer: {
      movie: movieReducer,
      auth: authReducer,
    },
  });
}

export const store = makeStore();
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof store.getState>;

export default store
