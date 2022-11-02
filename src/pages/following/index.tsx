import Infinite from '../../components/infinite';
import Layout from '../../layouts';
import { USER_FOLLOWING } from '../../utils/spotify';

const Following = () => {
 return (
  <Layout>
   <h1>Following</h1>
   <Infinite paginate url={USER_FOLLOWING} type="artist" display="grid" />
  </Layout>
 );
};

export default Following;
