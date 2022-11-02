import Image from "next/future/image";

const Artists = ({ artists }) => {
  return (
    <div className="grid gap-8 grid-cols-auto xs:grid-cols-2 md:grid-cols-4">
      {artists.map((artist) => {
        return (
          <div
            className="flex flex-col items-center gap-4 p-2 rounded-md"
            key={artist.id}
          >
            {artist.images?.[0] && (
              <Image
                src={artist.images[0].url}
                alt={artist.name + " avatar"}
                height={96}
                width={96}
                className="aspect-square md:w-[128px] md:w-[128px] lg:w-[192px] lg:h-[192px] object-cover rounded-full drop-shadow-md"
              />
            )}
            <a
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-center break-all xs:break-normal"
            >
              {artist.name}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Artists;
