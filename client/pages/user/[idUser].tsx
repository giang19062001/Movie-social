import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import axiosCustom from "@/http/axios";
import { UserCurrentPopulateInProp } from "@/types/user";
import { SidebarHome } from "@/components/sidebar/movie/sidebarHome";

type dataPathType = {
  _id: string;
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const id = params?.idUser?.toString();
  console.log('call');
  const response = await axiosCustom.get(`/user/${id}`, {
    headers: {
      Cookie: req.headers.cookie,
    },
  });

  return {
    props: { user: response.data },
  };
};
const UserDetail = ({ user }: UserCurrentPopulateInProp) => {
  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>
      <SidebarHome
        movies={[]}
        id={""}
        movie={undefined}
        user={user}
      ></SidebarHome>
    </>
  );
};

export default UserDetail;
