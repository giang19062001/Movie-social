import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import {  Movie, MovieListType, MoviePopulate } from "@/types/movie";


const initialState: MovieListType = {
  movies: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovies: (state, action: PayloadAction<MoviePopulate[]>) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { addMovies } = movieSlice.actions;

export const selectMovies = (state: AppState) => state.movie.movies;

export default movieSlice.reducer;
