import { useState } from 'react';
import Infinite from '../components/infinite';
import { Query } from '../types/spotify';
import { getTop, TIME_RANGE_DESCRIPTION } from '../utils/spotify';

const Top = ({ type, limit }: { type: 'tracks' | 'artists'; limit: number }) => {
 const [timeRange, setTimeRange] = useState<Query['time_range']>('long_term');
 const isActive = (term: string) => (timeRange === term ? 'btn-active btn-secondary' : 'btn-secondary');

 return (
  <div>
   <div className="flex flex-wrap justify-between">
    <span>Top tracks {TIME_RANGE_DESCRIPTION[timeRange]}</span>
    <div className="flex flex-wrap gap-2">
     <button className={`${isActive('long')}`} onClick={() => setTimeRange('long_term')}>
      All-Time
     </button>
     <button className={`${isActive('medium')}`} onClick={() => setTimeRange('medium_term')}>
      Last 6 Months
     </button>
     <button className={`${isActive('short')}`} onClick={() => setTimeRange('short_term')}>
      This Month
     </button>
    </div>
   </div>
   <Infinite paginate url={getTop(type, { limit: limit, time_range: timeRange })} />
  </div>
 );
};

export default Top;
