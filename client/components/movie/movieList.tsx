import { MovieListType } from "@/types/movie";
import React from "react";
import MovieItem from "./movieItem";
import { useAppDispatch } from "@/redux/hook";
import { addMovies } from "@/redux/movie/movieReducer";
import { useRouter } from "next/router";

export const MovieList = ({ movies }: MovieListType) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  dispatch(addMovies(movies));

  return (
    <div
      className={
        router.asPath.includes("search")
          ? "grid grid-cols-1  gap-4 my-10"
          : "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-10"
      }
    >
      {movies?.map((movie) => (
        <div key={movie._id}>
          <MovieItem movie={movie} />
        </div>
      ))}
    </div>
  );
};
