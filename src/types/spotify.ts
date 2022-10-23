export type Album = {
  album_type: string;
  artists: Artist[];
  external_urls: ExternalUrl;
  images: Image[];
  name: string;
  type: string;
  total_tracks: number;
  release_date: string;
};

export type Image = {
  url: string;
  height: string;
  width: string;
};

export type Artist = {
  external_urls: ExternalUrl;
  followers: { total: number };
  genres: string[];
  type: string;
  name: string;
  popularity: BigInteger;
  images: Image[];
};

export type ExternalUrl = { spotify: string };

export type Top = {
  albums: Album[];
  artists: { name: string; external_urls: ExternalUrl };
  duration_ms: number;
  explicit: boolean;
  name: string;
  popularity: number;
  type: string;
  preview_url?: string;
  external_urls: ExternalUrl;
  track_number?: number;
};
