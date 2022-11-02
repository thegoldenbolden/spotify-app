import Image from 'next/image';
import Link from 'next/link';
import convertMsToTime from '../utils/convertMsToTime';

const Track = ({ track, rank }) => {
 return (
  <div className="track">
   <span className="position">{rank}.</span>
   {track.album?.images?.[0] && (
    <Image
     src={track.album?.images?.[0].url}
     alt={track.album.name + ' album cover'}
     height={64}
     width={64}
     className="track-image"
    />
   )}
   <div className="details">
    <Link prefetch={false} href={`/tracks/${track.id}`}>
     <a className="track-name">{track.name}</a>
    </Link>
    <div>
     {track.explicit && <span>{track.explicit} • </span>}
     <div className="artists">
      {track.artists.map((artist, i) => (
       <>
        <Link prefetch={false} href={`/artists/${artist.id}`}>
         <a className="font-bold opacity-50">{artist.name}</a>
        </Link>
        {i < track.artists.length - 1 && <span>, </span>}
       </>
      ))}
     </div>
    </div>
   </div>
   <div className="album">
    <span>{track.album.name}</span>
   </div>
   <div className="duration">
    <span>{convertMsToTime(track.duration_ms)}</span>
   </div>
  </div>
 );
};

export default Track;
