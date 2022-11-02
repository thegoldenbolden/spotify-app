import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const Playlists = () => {
  return <div>Artist Info</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  return { props: {} };
};

export default Playlists;
