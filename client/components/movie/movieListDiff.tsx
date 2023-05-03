import { MovieListType } from "@/types/movie";
import React from "react";
import MovieItem from "./movieItem";
import { useRouter } from "next/router";



export const MovieListDiff = ({ movies }: MovieListType) => {
  const router = useRouter()
  const id = router.query?.idMovie
  return (
    <div className="grid grid-cols-1 gap-4 my-10 ">
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
