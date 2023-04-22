import { Movie, MovieItemType } from "@/types/movie";
import Image from "next/image";
import React from "react";
import defaultImage from "@/assets/images/default-avatar.png";
import Link from "next/link";

const MovieItemSearch = ({ movie }: MovieItemType) => {
  console.log(movie)
  return (
    <Link href={`/movie/detail/${movie._id}`}>
      <div className="flex gap-10">
        <div className="h-100 ml-0 sm:ml-12 md:ml-12 lg:ml-12 xl:ml-12">
          <Image
            src={`${process.env.HTTP_SERVER}/movies/${movie.title}/${movie.image}`}
            width={500}
            height={200}
            alt={movie.title}
            className="rounded-lg"
          />
        </div>
        <div className="my-5 flex gap-5">
          <div>
            <Image
              src={
                movie?.user?.image === "" || movie.user?.image === undefined
                  ? defaultImage
                  : `${process.env.HTTP_SERVER}/users/${movie.user?._id}/${movie.user?.image}`
              }
              width={50}
              height={50}
              alt={movie.user?.name}
              className="rounded-full"
            />
          </div>
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
export default MovieItemSearch;
