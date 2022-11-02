import axios, { AxiosRequestConfig } from "axios";

export type ExternalUrl = { spotify: string };
export type Image = { url: string; height: string; width: string };
export type TimeRangeDescription<T> = T extends "long_term" ? "of all time" : T extends "medium_term" ? "in the last 6 months" : "this month";

export interface Artist {
 external_urls: ExternalUrl;
 followers: { total: number };
 genres: string[];
 type: string;
 id: string;
 name: string;
 popularity: number;
 images: Image[];
};

export interface Album {
 album_type: string;
 artists: Artist[];
 external_urls: ExternalUrl;
 images: Image[];
 name: string;
 type: string;
 total_tracks: number;
 release_date: string;
};

export interface Playlist {
	collaborative: boolean;
	description?: string;
	external_urls: ExternalUrl;
	followers: { total: number };
	id: string;
	images: Image[],
	name: string;
	public: boolean;
	tracks: { items: Track[], next: string, total: number };
	owner: {		display_name: string;		id: string;		external_urls: ExternalUrl	};
};

export interface Track {
	album: Album;
	artists: Artist[];
	duration_ms: number;
	explicit: boolean;
	external_urls: ExternalUrl;
	href: string;
	id: string;
	name: string;
	popularity: string;

	"AudioFeatures": {
	acousticness: number; 
	danceability: number;
	energy: number;
	instrumentalness: number;
	key: number;
	liveness: number;
	loudness: number;
	mode: number;
	speechiness: number;
	tempo: number;
	time_signature: number;
	valence: number;
	}
	"AudioAnalysis": {
	num_samples: number;
	duration: number;
	key: number;
	mode: 0 | 1; // 1 Major, 0 Minor
	bars: {start: number, duration: number, confidence: number}[];
	beats: {start: number, duration: number, confidence: number}[];
	sections: {start: number, duration: number, confidence: number, loudness: number; tempo: number; key: number; mode: -1 | 0 | 1, time_signature: number;}[];
	segment: {
		start: number;
		duration: number; 
		confidence: number;
		loudness_start: number;
		loudness_max: number;
		loudness_max_time: number;
		loudness_end: number;
		pitches: number[];
		timbre: number[];
		tatum: {start: number; duration: number; confidence: number; }[];
	};
	}
};

export interface Query {
	// The index of the first item to return.
	offset?: number; 
	// The max number of items to return;
	limit?: number; 
	 // An ISO 3166-1 alpha-2 country code.
	market?: string;
	/**
		* Over what time frame the affinities are computed.
		* Long term - several years.
		* Medium term - approximately six months.
		* Short term - approximately four weeks. 
		*/
	time_range?: "long_term" | "medium_term" | "short_term",

	/**
		* Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned.
		* For example, to get just the playlist''s description and URI: fields=description,uri. 
		* A dot separator can be used to specify non-reoccurring fields, while parentheses can be used to specify reoccurring fields within objects. 
		* For example, to get just the added date and user ID of the adder: fields=tracks.items(added_at,added_by.id).
		* Use multiple parentheses to drill down into nested objects, for example: fields=tracks.items(track(name,href,album(name,href))). 
		* Fields can be excluded by prefixing them with an exclamation mark, for example: fields=tracks.items(track(name,href,album(!name,href)))
		* Example value:"items(added_by.id,track(name,href,album(name,href)))"
		*
		* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
		*/
	fields?: string;
	type?: string;
	ids?: string;
}

type Config = AxiosRequestConfig & { params: Query, token: string };
export type Response<T> = {	items: T,	total: number,	next: string };
export type GetPlaylists = (config: Config) => Promise<Response<Playlist[]>>;
export type GetFollowing = (config: Config) => Promise<Response<any>>;
export type GetTop<Type> = (config: Config) => Type extends Track ?  Promise<Response<Track[]>> : Promise<Response<Artist[]>>;
export type GetItem<Type> = (id: string, config: Config) => Promise<Response<Type extends Track ? Track : Type extends Artist ? Artist : Playlist>>;

export type GetArtists = (config: Config) => Promise<Response<Artist[]>>;
export type GetArtistTopTracks = (id: string, config: Config) => Promise<{ tracks: Track[] }>;
export type GetArtistRelated = (id: string, config: Config) => Promise<{ artists: Artist[] }>;
export type GetArtistAlbums = (id: string, config: Config) => Promise<Response<Album>>;

export type GetTracks = (config: Config) => Promise<Response<Track[]>>;
export type GetTrackAudioAnalysis = (id: string, config: Config) => Promise<Track["AudioAnalysis"]>;
export type GetTrackAudioFeatures = (id: string, config: Config) => Promise<Track["AudioFeatures"]>;

export type CheckFollowing = (config: Config & { ids: string }) => Promise<boolean[]>;
export type CheckPlaylistFollowers = (id: string, config: Config & { ids: string}) => Promise<boolean[]>;

export type Display = "flex" | "grid";
type PaginateProps = { paginate?: boolean; time?: Query["time_range"]; url: string; limit?: number, type: string, display?: Display };
export type Pagination = (x: PaginateProps) => JSX.Element;

export type CardProps = {
	name: string;
	image: Image;
	id: string;
	link: string;
	followers?: { link?: string, total: number };
}