// Spotify's Web API Documentation Reference
// https://developer.spotify.com/documentation/web-api/reference

import Spotify from "next-auth/providers/spotify";
import { Artist, CheckFollowing, CheckPlaylistFollowers, GetArtistAlbums, GetArtistRelated, GetArtistTopTracks, GetFollowing, GetItem, GetPlaylists, GetTop, GetTrackAudioFeatures, GetTracks, Playlist, Query, Track } from "../types/spotify";
import AxiosWrapper, { getConfig } from "./AxiosWrapper";

export const scopes = 'user-read-email user-library-read user-follow-read user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative';
export const SPOTIFY_AUTHORIZATION = "https://accounts.spotify.com/authorize?"
export const SPOTIFY_TOKEN = "https://accounts.spotify.com/token";
export const SPOTIFY_PLAYER = "https://open.spotify.com/" 
const SPOTIFY_API = 'https://api.spotify.com/v1'; 

const USER_PLAYLISTS = SPOTIFY_API + '/me/playlists';
const USER_LIBRARY = SPOTIFY_API + '/me/tracks';
const USER_FOLLOWING = SPOTIFY_API + '/me/following';
const USER_TOP_TRACKS  = SPOTIFY_API + '/me/top/tracks';
const USER_TOP_ARTISTS = SPOTIFY_API + '/me/top/artists'; 
const CHECK_USER_FOLLOWING = SPOTIFY_API + '/me/following/contains';

const GET_ARTIST = SPOTIFY_API + '/artists';
const GET_TRACK = SPOTIFY_API + '/tracks';
const GET_PLAYLIST = SPOTIFY_API + '/playlists';

/**
	* Get a list of the playlists owned or followed by the current Spotify user.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
	*/
export const getUserPlaylists: GetPlaylists = async (config) => {
	try {
	const { data: { items, next, total } } = await AxiosWrapper(`${USER_PLAYLISTS}`, getConfig(config));
	return { items, next, total };
	} catch (err) {
		console.error(err);
		return null;
	}
}

/**
	* Get a list of the songs saved in the current Spotify user's 'Your Music' library.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-tracks
	*/
export const getUserTracks: GetTracks = async (config) => {
	try {
		const { data: { items, next, total, }} = await AxiosWrapper(`${USER_LIBRARY}`, getConfig(config));
		return { items, next, total };
	} catch (err) {
		console.error(err);
		return null;
	}
}


/**
	* Get the current user's followed artists.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-followed
	*/
export const getUserFollowing: GetFollowing = async (config) => {
	try {
		const { data } = await AxiosWrapper(USER_FOLLOWING, getConfig(config));
	} catch (err) {
		console.error(err);
		return null;
	}
}

/**
	* Get the current user's top artists or tracks based on calculated affinity.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
	* 
	*/
export const getUserTopTrack: GetTop<Track> = async (config) => {
	try {
		const { data: { items, next, total } } = await AxiosWrapper(`${USER_TOP_TRACKS}`, getConfig(config));
		return { items, next, total };
	} catch (err) {
		console.error(err);
		return null;
	}
}

/**
	* Get the current user's top artists or tracks based on calculated affinity.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
	* 
	*/
export const getUserTopArtists: GetTop<Artist> = async (config) => {
	try {
		const { data: { items, next, total } } = await AxiosWrapper(`${USER_TOP_ARTISTS}`, getConfig(config));
		return { items, next, total };
	} catch (err) {
		console.error(err);
		return null;
	}
};

/**
	* Get a playlist owned by a Spotify user.
 *
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
	*/
export const getPlaylist: GetItem<Playlist> = async (id: string, config) => {
	try {
		const { data } = await AxiosWrapper(`${GET_PLAYLIST}/${id}`, config);
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
};

/**
	* Get Spotify catalog information for a single artist identified by its unique Spotify ID.
 *
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist
	*/
export const getArtist: GetItem<Artist> = async (id, config) => {
	try {
		const { data } = await AxiosWrapper(`${GET_ARTIST}/${id}`, config);
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
};

/**
	* Get Spotify catalog information for a single track identified by its unique Spotify ID.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track
	*/
export const getTrack: GetItem<Track> = async (id, config) => {
	try {
		const { data } = await AxiosWrapper(`${GET_TRACK}/${id}`, config);
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

/**
	* Check to see if the current user is following one or more artists or other Spotify users.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/check-current-user-follows
	*/
	export const checkUserFollowing: CheckFollowing = async config => {
		try {
			const { data } = await AxiosWrapper(CHECK_USER_FOLLOWING, getConfig(config));
			return data;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

/**
	* Check to see if one or more Spotify users are following a specified playlist.
 * 
	* * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-if-user-follows-playlist
	*/
export const checkPlaylistFollowers: CheckPlaylistFollowers = async (ids, config) => {
	try {
	const { data } = await AxiosWrapper(`${Spotify}/playlists/${ids}/followers/contains`, config);
	return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

/** 
	* Get Spotify catalog information about an artist's top tracks by country.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-top-tracks
	*/
export const getArtistTopTracks: GetArtistTopTracks = async (id: string, config) => {
	try {
			const { data } = await AxiosWrapper(`${GET_ARTIST}/${id}/top-tracks`, config);
			return data;
	} catch (err) {
		console.error(err);
		return null;
	}
};

/** 
	* Get Spotify catalog information about artists similar to a given artist. 
	* Similarity is based on analysis of the Spotify community's listening history.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-related-artists
	*/

export const getRelatedArtists: GetArtistRelated = async (id: string, config) => {
	try {
		const { data } = await AxiosWrapper(`${GET_ARTIST}/${id}/related-artists`, config);
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

/**
	* Get Spotify catalog information about an artist's albums.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-albums
	*/
export const getArtistAlbums: GetArtistAlbums = async (id: string, config) => {
	try {
		const { data } = await AxiosWrapper(`${GET_ARTIST}/${id}/albums`, config);
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

/** 
	* Get audio feature information for a single track identified by its unique Spotify ID.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features
	*/
export const getTrackAudioFeatures: GetTrackAudioFeatures = async (id: string, config) => {
	try {
		const { data } = await AxiosWrapper(`${SPOTIFY_API}/audio-features/${id}`, config);
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

/** 
	* Get a low-level audio analysis for a track in the Spotify catalog. 
	* The audio analysis describes the track's structure and musical content, including rhythm, pitch, and timbre.
	*
	* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-analysis
	*/
export const getTrackAudioAnalysis: GetTrackAudioFeatures = async (id: string, config) => {
	try {
		const { data } = await AxiosWrapper(`${SPOTIFY_API}/audio-analysis/${id}`, config);
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}