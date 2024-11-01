import { RouteObject } from 'react-router-dom';
import { PATH } from '../config';
import { lazy } from 'react';

//ARTIST
const ArtistList = lazy(() => import('@/pages/artist/list'));
const ArtistCreate = lazy(() => import('@/pages/artist/create'));
const ArtistDetails = lazy(() => import('@/pages/artist/details'));

export const routeArtist: RouteObject[] = [
	{
		path: PATH.ARTIST._,
		element: <ArtistList />,
	},
	{
		path: PATH.ARTIST.CREATE,
		element: <ArtistCreate />,
	},
	{
		path: PATH.ARTIST.DETAILS,
		element: <ArtistDetails />,
	},
];
