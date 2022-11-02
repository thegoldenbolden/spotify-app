import useSWRInfinite from 'swr/infinite';

import AxiosWrapper, { getConfig } from '../utils/AxiosWrapper';
import { formatQuery, getMaxLimit, USER_FOLLOWING } from '../utils/spotify';
import { Display, Query } from '../types/spotify';
import { useSession } from 'next-auth/react';

type Q = Query & { display: Display };
const useInfinite = (url: string, { display, time_range, limit, type }: Q) => {
 const { data: session } = useSession();
 const { data, error, size, setSize, isValidating }: any = useSWRInfinite(
  // Get SWR Key
  (index, previous) => {
   // Prevent fetch request if there's no access token present.
   if (!session?.user.access) return null;

   // Initial url for request
   if (index === 0) {
    const query: Query = {};
    if (time_range) query.time_range = time_range;
    if (type) query.type = type;
    if (limit) query.limit = getMaxLimit(limit, display);
    return Object.keys(query).length > 0 ? `${url}?${formatQuery(query)}` : url;
   }

   // The next page url returned from the previous page data.
   return previous.next;
  },
  // Fetcher
  async (url: string) => {
   const response = await AxiosWrapper(url, getConfig(session?.user.access, 'GET'));
   let data = { items: response.data?.items, next: response?.data.next };

   console.log(url);
   if (url.startsWith(`${USER_FOLLOWING}`)) {
    data.items = response.data?.artists?.items;
    data.next = response.data?.artists?.next;
   }

   return data;
  },
  // SWR Config
  {
   revalidateOnFocus: false,
   revalidateIfStale: false,
   revalidateFirstPage: false,
  }
 );

 const spotify = data ? [].concat(...data) : []; // Returned data
 const initial = !data && !error; // Loading initial data;
 const more = initial || (size > 0 && data && typeof data[size - 1] === 'undefined'); // Loading additional data.
 const empty = data?.[0]?.length === 0; // Data is empty.
 const end = empty || (data && !spotify[spotify.length - 1].next); // Returned all data.
 const refreshing = isValidating && data && data.length === size; // Refreshing data.
 return { spotify, initial, more, empty, end, refreshing, setSize };
};

export default useInfinite;
