import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { MovieItemType, MovieListType } from "@/types/movie";
import { SidebarHome } from "@/components/sidebar/movie/sidebarHome";
import axiosCustom from "@/http/axios";
import { MoviePopulate } from "@/types/movie";

type dataPathType = {
  _id: string;
};
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axiosCustom.get(`/movie/path`);
  const paths = response?.data.map((data: dataPathType) => ({
    params: { idMovie: data._id },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.idMovie?.toString();
  const response = await axiosCustom.get(`/movie/${id}`);
  const responseDiff = await axiosCustom.get(`/movie`);

  return {
    props: { movie: response.data, movies: responseDiff.data },
    revalidate: 10,
  };
};
type propDetail = {
  movie: MoviePopulate;
  movies: MoviePopulate[];
};
const MovieDetail = ({ movie, movies }: propDetail) => {
  const router = useRouter();
  const id = router.query.idMovie?.toString();
  const title = "Movie Id: " + id;

  return (
    <>
      <Head>
        <title key="title">{`${title}`}</title>
      </Head>
      <SidebarHome movies={movies} movie={movie} id={id as string}></SidebarHome>
    </>
  );
};

export default MovieDetail;
