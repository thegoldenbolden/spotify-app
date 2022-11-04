// Spotify's Web API Documentation Reference
// https://developer.spotify.com/documentation/web-api/reference

import { Query } from './types';

export const scopes =
 'user-read-email user-library-read user-follow-read user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative';
export const SPOTIFY_AUTHORIZATION = 'https://accounts.spotify.com/authorize?';
export const SPOTIFY_TOKEN = 'https://accounts.spotify.com/token';
export const SPOTIFY_PLAYER = 'https://open.spotify.com/';
const SPOTIFY_API = 'https://api.spotify.com/v1';

export const USER_PLAYLISTS = SPOTIFY_API + '/me/playlists';
export const USER_TOP_TRACKS = SPOTIFY_API + '/me/top/tracks';
export const USER_TOP_ARTISTS = SPOTIFY_API + '/me/top/artists';
export const USER_LIBRARY = SPOTIFY_API + '/me/tracks';
export const USER_FOLLOWING = SPOTIFY_API + '/me/following';
export const USER_RECENTLY_PLAYED = SPOTIFY_API + '/me/player/recently-played';
export const USER_CURRENTLY_PLAYING = SPOTIFY_API + 'me/player/currently-playing';
export const USER_SHOWS = SPOTIFY_API + '/me/shows';
export const USER_AUDIOBOOKS = SPOTIFY_API + '/me/audiobooks';
export const CHECK_USER_FOLLOWING = SPOTIFY_API + '/me/following/contains';

export const BROWSE_NEW_RELEASES = SPOTIFY_API + '/browse/new-releases';
export const BROWSE_FEATURED_PLAYLISTS = SPOTIFY_API + '/browse/featured-playlists';
export const GET_RECOMMENDATIONS = SPOTIFY_API + '/recommendations';

export const GET_ARTIST = SPOTIFY_API + '/artists';
export const getArtist = (id: string) => `${GET_ARTIST}/${id}`;
export const getArtistTopTracks = (id: string) => `${GET_ARTIST}/${id}/top-tracks`;
export const getArtistRelated = (id: string) => `${GET_ARTIST}/${id}/related-artists`;
export const getArtistAlbums = (id: string) => `${GET_ARTIST}/${id}/albums`;

export const GET_TRACK = SPOTIFY_API + '/tracks';
export const getTrack = (id: string) => `${GET_TRACK}/${id}`;
export const getTrackAudioFeatures = (id: string) => `${GET_TRACK}/${id}/audio-features`;
export const getTrackAudioAnalysis = (id: string) => `${GET_TRACK}/${id}/audio-analysis`;

export const GET_PLAYLIST = SPOTIFY_API + '/playlists';
export const getPlaylist = (id: string) => `${GET_PLAYLIST}/${id}`;
export const checkPlaylistFollowers = (id: string) => `${GET_PLAYLIST}/${id}/followers/contains`;

export const TimeRangeDescriptions = {
 long_term: 'of all time',
 medium_term: 'in the past 6 months',
 short_term: 'this month',
};

export const formatQuery = (params: Query) =>
 Object.entries(params)
  .map(([key, value]) => `${key}=${value}`)
  .join('&');
