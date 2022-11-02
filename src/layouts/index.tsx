import { useEffect } from 'react';
import { Home, User, Playlists, Logout, Tracks, Github } from '../utils/icons';
import Image from 'next/future/image';
import Link from 'next/link';

function Navigation() {
 return (
  <nav id="nav-links" className="fixed bottom-0 left-0 flex flex-wrap gap-2 md:static">
   <Link href="/">
    <a>
     <Home />
     <span>Home</span>
    </a>
   </Link>
   <Link href="/following">
    <a>
     <User />
     <span>Following</span>
    </a>
   </Link>
   <Link href="/tracks">
    <a>
     <Tracks />
     <span>Library</span>
    </a>
   </Link>
   <Link href="/playlists">
    <a>
     <Playlists />
     <span>Playlists</span>
    </a>
   </Link>
   <Link href="/logout">
    <a>
     <Logout />
     <span>Logout</span>
    </a>
   </Link>
  </nav>
 );
}

const Layout = ({ children }) => {
 useEffect(() => {
  if (window == undefined) return;
  const header = document.getElementById('header');

  const handleScroll = () => {
   const { backgroundColor } = header.style;
   const isTransparent = backgroundColor === 'transparent';
   if (header.offsetHeight < window.scrollY && !isTransparent) {
    header.style.backgroundColor = 'rgba(0, 0, 0, .85)';
    header.style.boxShadow = '0, 0, 3px, black';
    return;
   }

   if (header.offsetHeight >= window.scrollY && isTransparent) {
    header.style.backgroundColor = 'transparent';
    header.style.boxShadow = '';
    return;
   }
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
   window.removeEventListener('scroll', handleScroll);
  };
 }, []);

 return (
  <div id="app">
   <header id="header">
    <Image alt="Spotify logo" src="/images/spotify_green.png" height={24} width={96} className="object-contain" />
    <Navigation />
   </header>
   <main className="w-full h-full p-4 md:px-8">{children}</main>
   <footer className="flex items-center justify-center w-full p-2 mb-16 md:mb-0">
    Made by&nbsp;
    <a className="inline text-spotify" target="_blank" rel="noreferrer noopener" href="https://jacobbolden.com">
     Jacob Bolden
    </a>
    <a
     className="inline-flex items-center gap-2 ml-2"
     target="_blank"
     href="https://github.com/thegoldenbolden/spotify-app"
     rel="noreferrer noopener"
    >
     <Github className="mb-[.03em]" />
     <span>Github</span>
    </a>
   </footer>
  </div>
 );
};

export default Layout;
