import useSWR from "swr";
import axios from "axios";
import { SPOTIFY_API } from "../lib/constants";

const useData = (url: string, token: string) => {
  const { data, error } = useSWR(url, async () => {
    const response = await axios.get(SPOTIFY_API + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 30000,
    });
    console.log(response.data);
    return response.data;
  });

  console.log({ data, error });

  return {
    data: data,
    error: error,
    loading: !error && !data,
  };
};

export default useData;
