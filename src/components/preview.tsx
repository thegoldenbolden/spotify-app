import Link from 'next/link';

type PreviewProps = { id: string; title: string; children: JSX.Element; link?: string };
export default function Preview({ id, title, children, link }: PreviewProps) {
 return (
  <section id={id}>
   <div className="flex flex-wrap items-baseline justify-between">
    <h2 className="text-base font-bold sm:text-lg lg:text-xl 2xl:text-2xl">{title}</h2>
    <Link href={link}>
     <a className="text-xs font-bold tracking-widest uppercase opacity-75">See All</a>
    </Link>
   </div>
   {children}
  </section>
 );
}
