import { MovieListType } from "@/types/movie";
import React from "react";
import MovieItem from "./movieItem";
import { useAppSelector } from "@/redux/hook";
import { selectMovies } from "@/redux/movie/movieReducer";

type id = {
  id?: string;
};
export const MovieListDiff = ({ id }: id) => {
  const movies = useAppSelector(selectMovies);
  return (
    <div className="grid grid-cols-1 gap-4 my-10">
      {movies?.map((movie) =>
        movie._id !== id ? (
          <div key={movie._id}>
            <MovieItem movie={movie} />
          </div>
        ) : null
      )}
    </div>
  );
};
