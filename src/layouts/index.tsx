import { useEffect, useState } from 'react';
import { Home, User, Playlists, Logout, Tracks, Github, Favorites } from '../utils/icons';
import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiSearch2Fill, RiSearch2Line, RiSearchLine } from 'react-icons/ri';

function Navigation() {
 const router = useRouter();
 const isActive = (path: string) => (router.pathname === path ? 'active' : '');

 return (
  <nav id="nav-links">
   <Link href="/">
    <a className={isActive('/')}>
     <Home />
     <span>Home</span>
    </a>
   </Link>
   <Link href="/top">
    <a className={isActive('/following')}>
     <Favorites />
     <span>Favorites</span>
    </a>
   </Link>
   <Link href="/library">
    <a className={isActive('/playlists')}>
     <Playlists />
     <span>Library</span>
    </a>
   </Link>
   <Link href="/logout">
    <a className={isActive('/logout')}>
     <Logout />
     <span>Logout</span>
    </a>
   </Link>
  </nav>
 );
}

function Header() {
 useEffect(() => {
  if (window == undefined) return;
  const header = document.getElementById('header');

  const handleScroll = () => {
   const { backgroundColor } = header.style;
   const isTransparent = backgroundColor === 'transparent';

   if (header.offsetHeight < window.scrollY && isTransparent) {
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    header.style.boxShadow = '0, 0, 3px, black';
    return;
   }

   if (!isTransparent && header.offsetHeight >= window.scrollY) {
    header.style.backgroundColor = 'transparent';
    header.style.boxShadow = '';
   }
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
   window.removeEventListener('scroll', handleScroll);
  };
 }, []);

 return (
  <header id="header">
   <Image alt="Spotify logo" src="/images/spotify_green.png" height={24} width={96} className="object-contain" />
   <Navigation />
  </header>
 );
}

function Footer() {
 return (
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
 );
}

const Layout = ({ children }) => {
 return (
  <div id="app">
   <Header />
   <main className="w-full h-full p-4 md:px-8">{children}</main>
   <Footer />
  </div>
 );
};

export default Layout;
