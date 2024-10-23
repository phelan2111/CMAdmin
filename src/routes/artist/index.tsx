import { RouteObject } from 'react-router-dom';
import { PATH } from '../config';
import { lazy } from 'react';

//ARTIST
const ArtistList = lazy(() => import('@/pages/artist/list'));
const ArtistCreate = lazy(() => import('@/pages/artist/create'));

export const routeArtist: RouteObject[] = [
	{
		path: PATH.ARTIST._,
		element: <ArtistList />,
	},
	{
		path: PATH.ARTIST.CREATE,
		element: <ArtistCreate />,
	},
];
