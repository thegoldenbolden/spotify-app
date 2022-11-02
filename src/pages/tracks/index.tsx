import Infinite from '../../components/infinite';
import Layout from '../../layouts';
import { USER_LIBRARY } from '../../utils/spotify';

const UserLibrary = () => {
 return (
  <Layout>
   <h2 className="mb-2">Your Library</h2>
   <Infinite paginate url={USER_LIBRARY} limit={10} display="flex" />
  </Layout>
 );
};

export default UserLibrary;
