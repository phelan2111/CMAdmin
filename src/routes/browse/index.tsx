import { RouteObject } from 'react-router-dom';
import { PATH } from '../config';
import { lazy } from 'react';

//BROWSE
const GenreList = lazy(() => import('@/pages/browse/genre/list'));
const GenreDetails = lazy(() => import('@/pages/browse/genre/details'));
const TopicDetails = lazy(() => import('@/pages/browse/topic/details'));
const TopicList = lazy(() => import('@/pages/browse/topic/list'));

export const routeBrowse: RouteObject[] = [
	{
		path: PATH.BROWSE.GENRE._,
		element: <GenreList />,
	},
	{
		path: PATH.BROWSE.TOPIC._,
		element: <TopicList />,
	},
	{
		path: PATH.BROWSE.TOPIC.DETAILS,
		element: <TopicDetails />,
	},
	{
		path: PATH.BROWSE.GENRE.DETAILS,
		element: <GenreDetails />,
	},
];
