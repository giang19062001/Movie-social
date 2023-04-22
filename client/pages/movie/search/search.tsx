import { SidebarHome } from "@/components/sidebar/movie/sidebarHome";
import { messageError } from "@/helper/message";
import { Movie } from "@/types/movie";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);


const Search = () => {
  const router = useRouter();
  const title = router.query.title?.toString();
  const { data, error, isLoading, isValidating } = useSWR<Movie[]>(
   "/api/movie?title=" + title,
    fetcher
  );

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  if (data?.length === 0)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-2xl">
        {messageError.Search}
      </div>
    );
  return (
    <>
      <Head>
        <title key="title">Trang tìm kiếm</title>
      </Head>

      <SidebarHome
        movies={data as Movie[]}
        id={""}
        movie={undefined}      ></SidebarHome>
    </>
  );
};

export default Search;
