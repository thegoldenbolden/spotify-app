import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { getTop, USER_PLAYLISTS } from '../utils/spotify';
import Single from '../components/single';
import Section from '../components/section';
import useGreeting from '../hooks/useGreeting';
import useData from '../hooks/useData';
import Loading from '../components/loading';
import Layout from '../layouts';

const Home = () => {
 const { data: session, status } = useSession();
 const playlists = useData(USER_PLAYLISTS);
 const greeting = useGreeting();

 if (status === 'loading' || playlists.loading) {
  return <Loading />;
 }

 return (
  <Layout>
   <div className="flex flex-col gap-8">
    <div className="flex items-center gap-2">
     {session?.user.image && (
      <Image
       src={session?.user.image}
       alt="your avatar"
       width={48}
       height={48}
       className="rounded-full drop-shadow-md"
      />
     )}
     <div className="text-base sm:text-lg 2xl:text-2xl">
      <span>
       {greeting}, {session?.user.name}!
      </span>
      <div className="flex flex-wrap items-center gap-2 text-base font-bold text-light/75">
       <a
        target="_blank"
        rel="noreferrer noopener"
        title="Followers"
        href={`https://open.spotify.com/user/${session?.user.name}/followers`}
        className="font-bold text-light/75"
       >
        {session?.user?.followers ?? 'N/A'}
        <span>&nbsp;Followers</span>
       </a>
       <span className="text-xs">•</span>
       <Link title="Playlists" prefetch={false} href="/playlists">
        <a className="font-bold text-light/75">
         {playlists.data?.total ?? 'N/A'}
         <span>&nbsp;Playlists</span>
        </a>
       </Link>
      </div>
     </div>
    </div>
    <Section id="artists" title="Top Artists All-Time" link="/top/artists">
     <Single url={getTop('artists', { limit: 6, time_range: 'long_term' })} />
    </Section>
    <Section id="tracks" title="Top Tracks All-Time" link="/top/tracks">
     <Single url={getTop('tracks', { limit: 5, time_range: 'long_term' })} display="flex" />
    </Section>
    <Section id="playlists" title="Playlists" link="/playlists">
     <Single url={`${USER_PLAYLISTS}?limit=6`} />
    </Section>
   </div>
  </Layout>
 );
};

export default Home;
