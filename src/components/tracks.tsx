import Image from "next/future/image";
import Link from "next/link";
import convertMsToTime from "../lib/convertMsToTime";

const Tracks = ({ tracks }) => {
  return (
    <div className="flex flex-col gap-2">
      {tracks.map((item, i) => {
        return (
          <div
            className="grid py-2 px-4 gap-4 place-items-center grid-cols-[max-content_minmax(0,1fr)] sm:grid-cols-track rounded-md"
            key={item.id}
          >
            <div className="w-full">
              <span className="text-lg font-bold opacity-50">{i + 1}.</span>
            </div>
            <div className="flex items-center w-full gap-4">
              {item.album?.images?.[0] && (
                <Image
                  src={item.album?.images?.[0].url}
                  alt={item.album.name + " album cover"}
                  height={64}
                  width={64}
                />
              )}
              <div className="flex flex-col ellipsis">
                <Link href={`/track/${item.id}`}>
                  <a>{item.name}</a>
                </Link>
                <div>
                  <span>{item.explicit}</span>
                  <span className="ellipsis">
                    {item.artists.map((artist) => artist.name).join(", ")}
                  </span>
                </div>
              </div>
            </div>
            <div className="items-center hidden w-full h-full align-middle prefersColor sm:flex ellipsis">
              <span>{item.album.name}</span>
            </div>
            <div className="hidden sm:block">
              <span>{convertMsToTime(item.duration_ms)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tracks;
