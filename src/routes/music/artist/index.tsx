import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { PATH } from '@/routes/config';

//ARTIST
const ArtistList = lazy(() => import('@/pages/music/artist/list'));
const ArtistCreate = lazy(() => import('@/pages/music/artist/create'));
const ArtistDetails = lazy(() => import('@/pages/music/artist/details'));

export const routeArtist: RouteObject[] = [
	{
		path: PATH.MUSIC.ARTIST._,
		element: <ArtistList />,
	},
	{
		path: PATH.MUSIC.ARTIST.CREATE,
		element: <ArtistCreate />,
	},
	{
		path: PATH.MUSIC.ARTIST.DETAILS,
		element: <ArtistDetails />,
	},
];
