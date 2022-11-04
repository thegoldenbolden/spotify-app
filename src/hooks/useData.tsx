import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { Query } from '../_spotify/types';
import AxiosWrapper, { getConfig } from '../utils/AxiosWrapper';
import { formatQuery } from '../_spotify';
type UseData<T> = {
 data: T;
 error: any;
 loading: boolean;
};

export default function useData<T>(url: string, params?: Query, fetch: boolean = true): UseData<T> {
 const { data: session } = useSession();
 url = params ? `${url}?${formatQuery(params)}` : url;

 const { data, error } = useSWR(session?.user.access && fetch ? url : null, async (url) => {
  const response = await AxiosWrapper(url, getConfig({ token: session?.user.access }));
  console.count(url);
  return response.data;
 });

 return { data, error, loading: !error && !data };
}
