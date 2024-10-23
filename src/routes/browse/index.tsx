import { RouteObject } from 'react-router-dom';
import { PATH } from '../config';
import { lazy } from 'react';

//BROWSE
const GenreList = lazy(() => import('@/pages/browse/genre/list'));
const GenreCreate = lazy(() => import('@/pages/browse/genre/create'));

export const routeBrowse: RouteObject[] = [
	{
		path: PATH.BROWSE._,
		element: <GenreList />,
	},
	{
		path: PATH.BROWSE.CREATE,
		element: <GenreCreate />,
	},
];
