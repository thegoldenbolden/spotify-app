import { useSession } from 'next-auth/react';
import useSWRInfinite from 'swr/infinite';
import AxiosWrapper, { getConfig } from '../utils/AxiosWrapper';
import { Query } from '../types/spotify';
import { formatQuery } from '../utils/spotify';

export type UseInfinite<T> = {
 spotify: T[];
 isEnd: boolean;
 initialData: boolean;
 loadingMore: boolean;
 isEmpty: boolean;
 isRefreshing: boolean;
 setSize: any;
};

export default function useInfinite<T>(url: string, params?: Query): UseInfinite<T> {
 const { data: session } = useSession();
 url = params ? `${url}?${formatQuery(params)}` : url;

 const { data, error, size, setSize, isValidating } = useSWRInfinite(
  (index, previous) => {
   if (!session?.user.access) return null;
   if (index === 0) return url;
   console.log(previous);
   return previous.next;
  },
  async (url: string) => {
   const response = await AxiosWrapper(url, getConfig({ token: session?.user.access }));
   console.count(url);
   return response.data;
  },
  { revalidateOnFocus: false, revalidateIfStale: false, revalidateFirstPage: false }
 );

 const spotify = data ? [].concat(...data) : [];
 const initialData = !data && !error;
 const loadingMore = initialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
 const isEmpty = data?.[0]?.length === 0;
 const isEnd = isEmpty || (data && !spotify[spotify.length - 1].next);
 const isRefreshing = isValidating && data && data.length === size;

 return {
  spotify,
  initialData,
  loadingMore,
  isEmpty,
  isEnd,
  isRefreshing,
  setSize,
 };
}
