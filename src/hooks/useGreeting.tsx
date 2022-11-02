import { useEffect, useState } from 'react';

const useGreeting = () => {
 const [time, setTime] = useState<string>('Good morning');

 useEffect(() => {
  if (document) {
   const hour = new Date().getHours();
   setTime(
    hour < 12 && hour >= 3
     ? 'Good morning'
     : hour < 18 && hour >= 12
     ? 'Good afternoon'
     : hour < 22 && hour >= 18
     ? 'Good evening'
     : 'Have a good night'
   );
  }
 }, []);

 return time;
};

export default useGreeting;
