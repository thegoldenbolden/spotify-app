import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SpotifyProvider from 'next-auth/providers/spotify';

const scopes = `user-read-email user-library-read user-follow-read user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative`;
const SPOTIFY_AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?scope=${scopes}`;

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
 try {
  const url =
   'https://accounts.spotify.com/api/token?' +
   new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: token.refreshToken,
   });

  const response = await fetch(url, {
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
   },
   method: 'POST',
  });

  const refreshedTokens = await response.json();

  if (!response.ok) {
   throw refreshedTokens;
  }

  return {
   ...token,
   accessToken: refreshedTokens.access_token,
   accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
   refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
  };
 } catch (error) {
  console.log(error);
  return {
   ...token,
   error: 'RefreshAccessTokenError',
  };
 }
}

export const authOptions: NextAuthOptions = {
 debug: process.env.NODE_ENV === 'development',
 providers: [
  SpotifyProvider({
   clientId: process.env.SPOTIFY_CLIENT_ID,
   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
   authorization: SPOTIFY_AUTHORIZATION_URL,
   profile(profile) {
    let _profile$images, _profile$images$;
    return {
     id: profile.id,
     name: profile.display_name,
     email: profile.email,
     followers: profile.followers?.total ?? 'N/A',
     image:
      (_profile$images = profile.images) === null || _profile$images === void 0
       ? void 0
       : (_profile$images$ = _profile$images[0]) === null || _profile$images$ === void 0
       ? void 0
       : _profile$images$.url,
    };
   },
  }),
 ],
 pages: {
  error: '/error',
  newUser: '/',
  signIn: '/login',
  signOut: '/logout',
 },
 callbacks: {
  async jwt({ token, account, user, profile }) {
   if (account && user) {
    user.email = null;
    return {
     accessToken: account.access_token,
     accessTokenExpires: account.expires_at * 1000,
     refreshToken: account.refresh_token,
     user: {
      ...user,
      followers: (profile as any).followers?.total ?? 'N/A',
     },
    };
   }

   if (Date.now() < token.accessTokenExpires) {
    return token;
   }

   return refreshAccessToken(token);
  },
  async session({ session, token }) {
   session.user = {
    ...token.user,
    access: token.accessToken,
   };
   return session;
  },
 },
};

export default NextAuth(authOptions);
