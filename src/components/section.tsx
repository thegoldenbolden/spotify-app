import Link from 'next/link';

type SectionProps = { id: string; title: string; children: JSX.Element; link?: string };
export default function Section({ id, title, children, link }: SectionProps) {
 return (
  <section id={id} className="flex flex-col gap-2">
   <div className="flex flex-wrap items-baseline justify-between text-center text-md xs:text-start xs:text-xl sm:text-2xl">
    <h2>{title}</h2>
    {link && (
     <Link href={link}>
      <a className="text-base font-bold opacity-75">See More</a>
     </Link>
    )}
   </div>
   {children}
  </section>
 );
}
