import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment } from 'react';

import Layout from '../layouts';
import Loading from '../components/loading';
import Preview from '../components/preview';
import useData from '../hooks/useData';
import useGreeting from '../hooks/useGreeting';
import { Playlists, Tracks } from '../utils/icons';

import type { GetPlaylists } from '../_spotify/types';
import { USER_PLAYLISTS } from '../_spotify';

const Home = () => {
 const { data: session, status } = useSession();
 const greeting = useGreeting();
 const playlists = useData<GetPlaylists>(USER_PLAYLISTS, { limit: 5 });
 const seed_tracks = playlists?.data?.items?.[0]?.tracks?.items?.slice(0, 5).map((track) => track.id);

 if (status === 'loading') {
  return <Loading />;
 }

 return (
  <Layout>
   <div className="flex flex-wrap gap-4 mb-8 md:flex-nowrap md:justify-between">
    <div>
     <span id="heading" className="block text-base font-bold sm:text-xl lg:text-2xl 2xl:text-3xl">
      {greeting}, {session?.user.name}!
     </span>
     <div className="text-sm font-bold opacity-75">
      <span>{session?.user.followers} Followers</span>
      <span className="text-xs">&nbsp;•&nbsp;</span>
      <span>{playlists?.data?.total ?? '---'} Playlists</span>
     </div>
    </div>
    <div className="self-end h-full grow text-start sm:text-end">
     <span className="block text-base font-bold sm:text-lg">Recently Played</span>
     <Link href="/">
      <a className="text-sm opacity-75">Shawn Mendes - You</a>
     </Link>
    </div>
   </div>
   <div className="flex gap-2 mb-8 overflow-scroll justify-evenly">
    <Link href="/library">
     <a className="relative min-h-[250px] text-black rounded-md p-2 grow drop-shadow-md bg-gradient-to-r from-purple-500 to-pink-500">
      Library
      <Tracks className="absolute bottom-0 right-0 opacity-25 text-8xl" />
     </a>
    </Link>
    <Link href="/playlists">
     <a className="min-h-[250px] bg-yellow-100 text-black rounded-md p-2 grow drop-shadow-md">
      Playlists
      <Playlists className="absolute bottom-0 right-0 opacity-25 text-8xl" />
     </a>
    </Link>
    <Link href="/podcasts">
     <a className="min-h-[250px] bg-yellow-100 text-black rounded-md p-2 grow drop-shadow-md">Podcasts</a>
    </Link>
   </div>
   <div className="grid gap-16 sm:grid-cols-2">
    <Preview id="top-tracks" title="Favorite Tracks" link="/top/tracks">
     <div className="flex items-center gap-2 p-2 rounded-md row hover:bg-light/10 focus-within:bg-light/10">
      <div className="h-[64px] rounded-md aspect-square bg-black"></div>
      <div className="flex flex-col justify-center gap-2 grow">
       <Link href="/">
        <a>You</a>
       </Link>
       <div>
        {[1, 2].map((x, i) => {
         return (
          <Fragment key={i}>
           <Link href="/">
            <a>{x}</a>
           </Link>
           {i < 1 && <span>, </span>}
          </Fragment>
         );
        })}
       </div>
      </div>
      <div className="hidden sm:block">1827 Plays</div>
     </div>
    </Preview>
   </div>
  </Layout>
 );
};

export default Home;
