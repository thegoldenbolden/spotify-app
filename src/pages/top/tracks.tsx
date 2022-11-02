import Layout from '../../layouts';
import Top from '../../layouts/top';
const Artists = () => {
 return (
  <Layout>
   <Top type="tracks" limit={10} />;
  </Layout>
 );
};
export default Artists;
