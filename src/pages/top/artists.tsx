import Layout from '../../layouts';
import Top from '../../layouts/top';
const Artists = () => {
 return (
  <Layout>
   <Top type="artists" limit={24} />;
  </Layout>
 );
};
export default Artists;
