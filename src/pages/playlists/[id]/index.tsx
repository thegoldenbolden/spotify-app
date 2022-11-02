import Image from 'next/image';
import { useRouter } from 'next/router';

import Error from '../../../components/error';
import Loading from '../../../components/loading';
import useData from '../../../hooks/useData';
import Layout from '../../../layouts';
import { Playlist } from '../../../types/spotify';
import { formatQuery, getPlaylist } from '../../../utils/spotify';

const fields = `description,collaborative,external_urls,public,owner,tracks.items(track(album(images,name),added.at,added_by.name,id,name,explicit,artists(id,name),duration_ms)`;

const Playlist = () => {
 const router = useRouter();
 const { id } = router.query as { id: string };
 const url = `${getPlaylist(id)}?${formatQuery({ fields })}`;
 const { data, loading, error } = useData(url);

 if (loading) {
  return <Loading />;
 }

 if (error) {
  return <Error />;
 }

 const playlist = data.items as Playlist;
 return (
  <Layout>
   <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
    <Image src={playlist.images[0].url} height={96} width={96} alt={`${playlist.name} cover image`} />
    <div>
     <h1>{playlist.name}</h1>
    </div>
   </div>
  </Layout>
 );
};

export default Playlist;
