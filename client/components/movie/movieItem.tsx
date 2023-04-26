import { MovieItemType } from "@/types/movie";
import Image from "next/image";
import React from "react";
import defaultImage from "@/assets/images/default-avatar.png";
import Link from "next/link";
import { useRouter } from "next/router";

const MovieItem = ({ movie }: MovieItemType) => {
  const router = useRouter();
  console.log(router);
  return (
    <Link href={`/movie/detail/${movie._id}`}>
      <div
        className={
          router.asPath.includes("search")
            ? "h-100 ml-0 sm:ml-12 md:ml-12 lg:ml-12 xl:ml-12 flex items-center gap-10"
            : "h-100"
        }
      >
        <Image
          src={`${movie.image}`}
          width={500}
          height={200}
          alt={movie.title}
          className="rounded-lg"
        />
        <div className="my-5 flex gap-5">
          {!router.asPath.includes("user") ? (
            <div>
              <Image
                src={
                  movie?.user?.image === "" || movie.user?.image === undefined
                    ? defaultImage
                    : `${movie.user?.image}`
                }
                width={50}
                height={50}
                alt={movie.user?.name}
                className="rounded-full"
              />
            </div>
          ) : null}

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
export default MovieItem;
