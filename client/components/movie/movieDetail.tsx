import { Movie, MovieItemType } from "@/types/movie";
import Image from "next/image";
import React from "react";
import defaultImage from "@/assets/images/default-avatar.png";
import Link from "next/link";
import ReactPlayer from "react-player";


const MovieDetailComponent = ({ movie }: MovieItemType) => {
  return (
    <Link href={`/detailMovie/${movie._id}`}>
    <div className="h-100 my-4 ml-0 sm:ml-24 md:ml-24 lg:ml-24 xl:ml-24">
            <ReactPlayer
            url={movie?.link}
            width="1000px"
            height="600px"
            playing={true}
            controls={true}
        />
      <div className="my-5 flex gap-5">
        <div>
          <Image
             src={
              movie?.user?.image === "" || movie.user?.image === undefined
              ? defaultImage
                : `${movie.user?.image}`
            }
            width={100}
            height={100}
            alt={movie.user?.name}
            className="rounded-full  border border-gray-100"
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
export default MovieDetailComponent;
