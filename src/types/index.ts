import { Image, Query } from '../_spotify/types';

export type Display = 'flex' | 'grid';
type PaginateProps = {
 paginate?: boolean;
 time?: Query['time_range'];
 url: string;
 limit?: number;
 type: string;
 display?: Display;
};
export type Pagination = (x: PaginateProps) => JSX.Element;

export type CardProps = {
 name: string;
 image: Image;
 id: string;
 link: string;
 followers?: { link?: string; total: number };
};
