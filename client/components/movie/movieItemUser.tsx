import {  MovieItemType } from "@/types/movie";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const MovieItemUser = ({ movie }: MovieItemType) => {
  return (
    <Link href={`/movie/detail/${movie._id}`}>
    <div className="h-100">
      <Image
        src={`${process.env.HTTP_SERVER}/movies/${movie.title}/${movie.image}`}
        width={500}
        height={200}
        alt={movie.title}
        className="rounded-lg"
      />
      <div className="my-5 flex gap-5">
        <div>
          <b className="">{movie.title}</b>
          <p>{movie.user.name}</p>
          <p>{new Date(movie.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
    </Link>
  );
};
export default MovieItemUser;
