import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type Response = AxiosResponse<any, any>;
type Axios = (url: string, config: AxiosRequestConfig<any>, data?: any) => Promise<Response | null>;
type GetConfig = (config: AxiosRequestConfig & { token: string }) => AxiosRequestConfig<any>;

export const getConfig: GetConfig = ({ token, method, params }) => ({
 method: method ?? 'GET',
 params: params ?? {},
 timeout: 30000,
 headers: {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
 },
});

const AxiosWrapper: Axios = async (url, config = { method: 'GET' }, data) => {
 let response: Response;

 const CancelToken = axios.CancelToken;
 const source = CancelToken.source();
 config.cancelToken = source.token;

 try {
  switch (config.method) {
   default:
    throw new Error('Method Not Allowed');
   case 'GET':
    response = await axios.get(url, config);
    break;
   case 'PUT':
    if (!data) throw new Error('There was no data provided to update.');
    response = await axios.put(url, data, config);
    break;
   case 'DELETE':
    response = await axios.delete(url, config);
    break;
  }

  return response;
 } catch (err) {
  if (axios.isCancel(err)) {
   console.log('Request canceled', err.message);
  } else {
   console.error(err);
  }
  return null;
 }
};

export default AxiosWrapper;
