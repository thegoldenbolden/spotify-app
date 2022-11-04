import useData from '../../hooks/useData';
import { GET_RECOMMENDATIONS } from '../../_spotify';
import type { GetRecommendations, Track } from '../../_spotify/types';

const Recommendations = ({ query }) => {
 const recs = useData<GetRecommendations<Track>>(GET_RECOMMENDATIONS, query, query.seeds ? true : false);

 return <div>TrackRecs</div>;
};

export default Recommendations;
