import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../../layouts';
import Error from '../../../components/error';
import Loading from '../../../components/loading';
import useData from '../../../hooks/useData';
import { Track } from '../../../types/spotify';
import { getArtistOrTrack } from '../../../utils/spotify';
import convertMsToTime from '../../../utils/convertMsToTime';

const Track = () => {
 const router = useRouter();
 const { id } = router.query as { id: string };
 const { data, loading, error } = useData(getArtistOrTrack('tracks', id));

 if (loading) {
  return <Loading />;
 }

 if (error) {
  return <Error />;
 }

 const track = data.items as Track;

 return (
  <Layout>
   <div className="flex flex-wrap gap-2">
    <span data-popularity={track.popularity}>
     {track.album.images[0].url && (
      <Image src={track.album.images[0].url} alt={track.name + 'cover'} height={192} width={192} />
     )}
    </span>
    <div className="flex flex-col gap-2 ellipsis">
     <a href={track.external_urls.spotify} rel="noreferrer noopener" title={`Play ${track.name} on Spotify`}>
      {track.explicit ? 'E • ' : ''}
      {track.name} • {convertMsToTime(track.duration_ms)}
     </a>
     <div className="flex gap-2">
      {track.artists[0]?.images?.[0].url && (
       <Image
        src={track.artists[0].images[0].url}
        alt={`${track.artists[0].name} avatar`}
        height={48}
        width={48}
        className="rounded-full"
       />
      )}
      <div className="artists">
       {track.artists.map((artist, i) => (
        <>
         <Link prefetch={false} href={`/artists/${artist.id}`}>
          <a className="font-bold opacity-50">
           {artist.name}
           {i < track.artists.length - 1 && <span>, </span>}
          </a>
         </Link>
        </>
       ))}
      </div>
     </div>
    </div>
   </div>
  </Layout>
 );
};

export default Track;
