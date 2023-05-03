import { MovieListType } from "@/types/movie";
import React, { useEffect, useState } from "react";
import MovieItem from "./movieItem";
import { CategoryAll } from "@/types/category";

import { useRouter } from "next/router";
import axios from "axios";

const categorys: CategoryAll = {
  _id: "",
  title: "",
  movie: [],
};
export const MovieList = ({ movies }: MovieListType) => {
  const router = useRouter();
  const [cates, setCates] = useState<CategoryAll[]>([categorys]);
  const [selectCate, setSelectCate] = useState<string>("ALL");
  useEffect(() => {
    axios.get(`${process.env.HTTP_SERVER}/category`).then((res) => {
      setCates(res.data);
    });
  }, []);

  return (
    <div
      className={
        router.asPath.includes("search")
          ? " my:36 sm:my-10 md:my-10 lg:my-10 xl:my-10"
          : " my-10 sm:my-10 md:my-10 lg:my-10 xl:my-10"
      }
    >
      {router.asPath.includes("search") ? null : (
        <div
          className="inline-flex gap-4
          transition duration-150 ease-in-out"
          role="group"
        >
          <button
            onClick={() => setSelectCate("ALL")}
            type="button"
            className=" border-b-2 inline-block rounded-lg bg-red px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white 
              transition duration-150 ease-in-out 
              hover:bg-red-900 focus:bg-red-600 focus:outline-none focus:ring-0 active:bg-red-700"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Tất cả
          </button>
          {cates?.map((category) => (
            <button
              onClick={() => setSelectCate(category._id)}
              key={category._id}
              type="button"
              className=" border-b-2 inline-block rounded-lg bg-red px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white 
              transition duration-150 ease-in-out 
              hover:bg-red-900 focus:bg-red-600 focus:outline-none focus:ring-0 active:bg-red-700"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              {category.title}
            </button>
          ))}
        </div>
      )}

      <div
        className={
          router.asPath.includes("search")
            ? "grid grid-cols-1  gap-4 "
            : "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 "
        }
      >
        {movies?.map((movie) =>
          selectCate === "ALL" ? (
            <div key={movie._id}>
              <MovieItem movie={movie} />
            </div>
          ) : movie.category._id === selectCate ? (
            <div key={movie._id}>
              <MovieItem movie={movie} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
