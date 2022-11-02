import { useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import Image from "next/future/image";

const Layout = ({ children }) => {
  const { height } = useWindowSize();
  useEffect(() => {
    if (document) {
      const header = document.getElementsByTagName("header").item(0);
      const main = document.getElementById("main");
      main.style.height = height - header.offsetHeight + "px";
    }
  }, [height]);

  return (
    <div id="app" className="light">
      <header className="text-sm p-[1px] text-end">Spotify</header>
      <div id="main" className="flex">
        <nav className="flex flex-col items-center justify-between p-8">
          <Image
            src="/images/spotify_green.png"
            height={127}
            width={128}
            alt="spotify logo"
          />
          <div className="flex flex-col">
            <button className="text-white">Home</button>
            <button className="text-white">Playlists</button>
          </div>
          <button
            className="hover:brightness-125 text-dark focus:brightness-[125] flex items-center gap-2 px-4 min-w-[150px] justify-center py-2 text-lg rounded-full drop-shadow-md bg-spotify w-max"
            onClick={() => signOut()}
          >
            <span>
              <CiLogout />
            </span>
            <span>Logout</span>
          </button>
        </nav>
        <main className="h-full grow">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
