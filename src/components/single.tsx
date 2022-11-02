import { Fragment } from 'react';

import Track from './track';
import Card from './card';
import useData from '../hooks/useData';
import Loading from './loading';
import Error from './error';

const Single = ({ url, display = 'grid' }) => {
 const { data, loading, error } = useData(url);

 if (loading) {
  return <Loading />;
 }

 if (error) {
  return <Error />;
 }

 const className =
  display == 'flex'
   ? 'flex flex-col gap-2'
   : 'grid gap-2 grid-cols-1 xs:gap-8 xs:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6';

 console.log(url);
 console.log(data);

 return (
  <div className={className}>
   {data.items.map((item: any, i: number) => {
    return (
     <Fragment key={`${i}`}>
      {display == 'flex' ? (
       <Track track={item?.track ?? item} rank={i + 1} />
      ) : (
       <Card
        image={item.images?.[0]}
        name={item.name}
        link={item.external_urls.spotify}
        id={item.id}
        followers={item.followers ?? null}
       />
      )}
     </Fragment>
    );
   })}
  </div>
 );
};

export default Single;
