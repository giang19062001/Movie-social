import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { MovieItemType } from "@/types/movie";
  import { SidebarHome } from "@/components/sidebar/movie/sidebarHome";
import axiosCustom from "@/http/axios";

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

  return {
    props: { movie: response.data },
    revalidate: 10,
  };
};

const MovieDetail = ({ movie }: MovieItemType) => {
  const router = useRouter();
  const id = router.query.idMovie!.toString();
  const title = "Movie Id: " + id;

  return (
    <>
      <Head>
        <title key="title">{`${title}`}</title>
      </Head>
      <SidebarHome movies={[]} movie={movie} id={id}></SidebarHome>
    </>
  );
};

export default MovieDetail;
