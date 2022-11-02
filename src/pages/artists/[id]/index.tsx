import Image from 'next/image';
import { useRouter } from 'next/router';
import Single from '../../../components/single';
import Section from '../../../components/section';
import useData from '../../../hooks/useData';
import { getArtistAlbums, getArtistOrTrack, getArtistTopTracks, getRelatedArtists } from '../../../utils/spotify';
import Loading from '../../../components/loading';
import Error from '../../../components/error';
import Layout from '../../../layouts';

const Artist = () => {
 const router = useRouter();
 const { id } = router.query as { id: string };
 const artist = useData(`${getArtistOrTrack('artists', id)}`);

 if (artist.loading) {
  return <Loading />;
 }

 if (artist.error) {
  return <Error />;
 }

 return (
  <Layout>
   <div className="flex flex-wrap gap-2">
    <Image src={artist.data.items.images?.[0]} height={96} alt={`${artist.data.items.name} Profile`} width={96} />
    <div>
     <span>{artist.data.items.name}</span>
     <span>{artist.data.items.followers.total}</span>
     <div>
      {artist.data.items.genres.map((genre, i) => (
       <span key={i} className="capitalize">
        {genre}
       </span>
      ))}
     </div>
    </div>
    <span>Popularity {artist.data.items.popularity}</span>
   </div>
   <Section id="top-tracks" title="Top Tracks">
    <Single url={getArtistTopTracks(id)} display="flex" />
   </Section>
   <Section id="albums" title="Albums">
    <Single url={getArtistAlbums(id)} />
   </Section>
   <Section id="related-artists" title="Related Artists">
    <Single url={getRelatedArtists(id)} />
   </Section>
  </Layout>
 );
};

export default Artist;
