import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export const config = {
 matcher: ['/', '/tracks:path*', '/artists:path*', '/playlists:path*', '/logout'],
};

export default withAuth({
 pages: {
  signIn: '/login',
  signOut: '/logout',
 },
});
