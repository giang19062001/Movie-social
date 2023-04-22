import { MovieList } from "@/components/movie/movieList";
import { SidebarHome } from "@/components/sidebar/movie/sidebarHome";
import axiosCustom from "@/http/axios";
import { MovieListType } from "@/types/movie";
import { GetServerSideProps } from "next";
import Head from "next/head";


export const getServerSideProps: GetServerSideProps = async ({}) => {

  const response = await axiosCustom.get(`/movie`);
  return {
    props: {
      movies: response.data,
    },
  };
  
};
export default function Home({ movies }: MovieListType) {
  return (
    <>
      <Head>
        <title key={"title"}>Youtube - NestJs</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SidebarHome movies={movies} movie={undefined} id={""}></SidebarHome>
      </main>
    </>
  );
}
