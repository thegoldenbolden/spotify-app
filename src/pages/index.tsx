import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useEffect, useState, Suspense } from "react";
import Image from "next/future/image";
import useMedia from "react-use/lib/useMedia";

import { CiLogout } from "react-icons/ci";
import { signOut } from "next-auth/react";
import axios from "axios";
import { SPOTIFY_API } from "../lib/constants";
import Artists from "../components/artists";
import Tracks from "../components/tracks";

const Home = ({ user }) => {
  const [time, setTime] = useState<string>("morning");

  useEffect(() => {
    if (document) {
      const hour = new Date().getHours();
      setTime(
        hour < 12 && hour >= 3
          ? "Good morning"
          : hour < 18 && hour >= 12
          ? "Good afternoon"
          : hour < 22 && hour >= 18
          ? "Good evening"
          : "Have a good night"
      );
    }
  }, []);

  // useEffect(() => {
  //   if (document && window) {
  //     const colors = [
  //       "rgba(29, 185, 84, .7)",
  //       "rgba(71, 114, 109, 0.7)",
  //       "rgba(75, 71, 114, 0.7)",
  //       "rgba(124, 13, 109, 0.7)",
  //       "rgba(188, 81, 133, 0.7)",
  //     ];

  //     const random = ~~(Math.random() * colors.length);
  //     document.body.style.backgroundImage = `linear-gradient(to bottom, black, ${colors[random]})`;
  //   }
  // }, []);

  return (
    <div id="app">
      <header className="flex z-10 fixed top-0 left-0 justify-center w-screen py-[4px] align-center">
        <Image
          alt="Spotify logo"
          src="/images/spotify_green.png"
          height={24}
          width={96}
          className="object-contain"
        />
      </header>
      <main id="main" className="relative h-full px-4 bg-transparent md:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-center gap-4 mt-12 sm:justify-start">
            {user.image && (
              <Image
                src={user.image}
                alt="your avatar"
                width={96}
                height={96}
                className="h-auto w-auto sm:h-[144px] lg:h-[192px] rounded-full drop-shadow-md"
              />
            )}
            <div className="flex flex-col justify-between w-full gap-2 text-center break-all sm:w-auto grow sm:text-start shadowText">
              <h2 className="text-sm font-bold sm:text-base">
                {time}
                <span className="sm:hidden">, {user.name}</span>!
              </h2>
              <span className="hidden text-xl sm:text-5xl md:text-6xl sm:block">
                {user.name}
              </span>
              <div className="flex flex-wrap justify-center gap-2 text-sm sm:justify-start sm:text-base">
                <span className="font-bold text-light/75">
                  {user.followers} <span>followers</span>
                </span>
                <span className="font-bold text-light/75">
                  {user.playlists} <span>playlists</span>
                </span>
              </div>
            </div>
          </div>
          <section id="artists" className="p-2">
            <h2 className="mb-4 text-xl text-center xs:text-start xs:text-2xl">
              Top All-Time Artists
            </h2>
            <Artists artists={user.artists} />
          </section>
          <section id="artists" className="p-2">
            <h2 className="mb-4 text-xl text-center xs:text-start xs:text-2xl">
              Top All-Time Tracks
            </h2>
            <Tracks tracks={user.tracks} />
          </section>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="fixed p-2 rounded-full bg-light text-dark sm:p-6 drop-shadow-md bottom-2 sm:bottom-8 sm:right-8 lg:bottom-16 lg:right-16 right-2"
        >
          <CiLogout className="text-xl sm:text-4xl" />
        </button>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log("GETTING PROFILE");

  if (!session?.user) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  let user = {
    followers: session.user.followers,
    image: session.user.image,
    artists: [],
    tracks: [],
    playlists: "N/A",
    name: session.user.name,
  };

  if (session.user.access) {
    const TOP_API = SPOTIFY_API + "/me/top";
    const TOP_QUERY = "limit=8&time_range=long_term";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.access}`,
      },
    };
    const [artists, tracks, playlists] = await Promise.all([
      await axios.get(`${TOP_API}/artists?${TOP_QUERY}`, config),
      await axios.get(`${TOP_API}/tracks?${TOP_QUERY}`, config),
      await axios.get(SPOTIFY_API + "/me/playlists", config),
    ]).catch((e) => {
      console.log(e);
      return null;
    });

    user.artists = artists.data?.items ?? [];
    user.tracks = tracks.data?.items ?? [];
    user.playlists = playlists.data.total ?? "N/A";
  }

  return { props: { user } };
};

export default Home;
