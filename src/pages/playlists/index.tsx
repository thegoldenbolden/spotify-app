import { USER_PLAYLISTS } from '../../utils/spotify';
import Infinite from '../../components/infinite';
import Layout from '../../layouts';

const Playlists = () => {
 return (
  <Layout>
   <h1>Your Playlists</h1>
   <Infinite url={USER_PLAYLISTS} display="grid" paginate />
  </Layout>
 );
};

export default Playlists;
