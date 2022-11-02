import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import AxiosWrapper, { getConfig } from '../utils/AxiosWrapper';

const useData = (url: string) => {
 const { data: session } = useSession();
 const { data, error } = useSWR(session?.user.access ? url : null, async (url) => {
  const response = await AxiosWrapper(url, getConfig(session?.user.access, 'GET'));
  const { data: res } = response;
  const data = { total: res?.total, items: res?.items, next: res?.next };

  if (url.endsWith('related-artists')) {
   console.log(data);
   data.total = res.artists.length;
   items: res.artists;
   next: null;
  }
  return data;
 });

 return {
  data: { total: data?.total, items: data?.items ?? data, next: data?.next },
  error: error,
  loading: !error && !data,
 };
};

export default useData;
