import { RouteObject } from 'react-router-dom';
import { PATH } from '../config';
import { lazy } from 'react';

//BROWSE
const GenreList = lazy(() => import('@/pages/browse/genre/list'));
const GenreCreate = lazy(() => import('@/pages/browse/genre/create'));
const TopicList = lazy(() => import('@/pages/browse/topic/list'));

export const routeBrowse: RouteObject[] = [
	{
		path: PATH.BROWSE.GENRE._,
		element: <GenreList />,
	},
	{
		path: PATH.BROWSE.GENRE.CREATE,
		element: <GenreCreate />,
	},
	{
		path: PATH.BROWSE.TOPIC._,
		element: <TopicList />,
	}
];
