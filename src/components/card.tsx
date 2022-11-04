import Image from 'next/future/image';
import { RiHeart3Fill as Followers } from 'react-icons/ri';
import { CardProps } from '../types';

const Card = (props: CardProps) => {
 const { name, image, link, followers, id } = props;
 return (
  <div className="card" key={id}>
   {image && (
    <Image
     src={image.url}
     alt={`${name} Avatar`}
     height={96}
     width={96}
     className="object-cover rounded-full thumbnail drop-shadow-md"
    />
   )}
   <div className="flex flex-col justify-center gap-2 text-center break-all xs:break-normal">
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-center">
     {name}
    </a>
    {followers?.total ? (
     <div title="Followers" className="flex items-center justify-center gap-2 font-sans text-xs opacity-75">
      <Followers className="mb-[.03em]" />
      <span>{followers.total}</span>
     </div>
    ) : null}
   </div>
  </div>
 );
};

export default Card;
