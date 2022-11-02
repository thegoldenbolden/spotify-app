import { Fragment } from 'react';

import { Pagination } from '../types/spotify';
import useInfinite from '../hooks/useInfinite';
import Track from './track';
import Card from './card';
import Loading from './loading';
import Error from './error';

const Infinite: Pagination = ({ paginate, url, type, time, limit, display }) => {
 const data = useInfinite(url, { time_range: time, type, limit, display });

 if (data.empty) {
  return <Error />;
 }

 const className =
  display == 'flex'
   ? 'flex flex-col gap-2'
   : 'grid gap-8 grid-cols-auto xs:grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6';

 const { spotify, more, end, refreshing, setSize, initial } = data;

 if (initial) {
  return <Loading />;
 }

 console.log(spotify);

 return (
  <div className="flex flex-col gap-2">
   <div className={className}>
    {spotify.map(({ items }: { items: any[] }, page: number) => {
     return items?.map((item, pos) => {
      const rank = page * (spotify[page - 1]?.items?.length ?? 0) + pos + 1;
      return (
       <Fragment key={`${page}-${item.id}`}>
        {display == 'flex' ? (
         <Track track={item?.track ?? item} rank={rank} />
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
     });
    })}
   </div>
   {!paginate ? null : end ? null : (
    <button disabled={refreshing || more} onClick={() => setSize((p: number) => p + 1)}>
     {more || refreshing ? 'Loading...' : 'See More'}
    </button>
   )}
  </div>
 );
};

export default Infinite;
