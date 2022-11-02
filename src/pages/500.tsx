import Link from "next/link";

export default function Custom500() {
  return (
    <>
      <video height="200" width="320" autoPlay={true} loop={true} muted={true}>
        <source
          src="https://player.vimeo.com/external/547911041.sd.mp4?s=86a934be9a89a958f8acc8abdde890b3552957df&quality=100"
          type="video/mp4"
        ></source>
      </video>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="flex flex-col gap-8 p-8 items-center justify-center text-center text-white rounded min-h-[40%] drop-shadow-md w-fit">
          <span className="text-2xl font-bold">Oops! An error occured.</span>
          <Link
            href="/"
            className="flex flex-wrap items-center gap-2 p-2 px-4 text-center rounded-full bg-spotify drop-shadow-md"
          >
            <a>Back to Home</a>
          </Link>
        </div>
      </div>
    </>
  );
}
