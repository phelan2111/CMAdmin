import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { PATH } from '@/routes/config';

//ARTIST
const SongList = lazy(() => import('@/pages/music/song/list'));
const SongCreate = lazy(() => import('@/pages/music/song/create'));
const SongDetails = lazy(() => import('@/pages/music/song/details'));

export const routeSong: RouteObject[] = [
	{
		path: PATH.MUSIC.SONG._,
		element: <SongList />,
	},
	{
		path: PATH.MUSIC.SONG.CREATE,
		element: <SongCreate />,
	},
	{
		path: PATH.MUSIC.SONG.DETAILS,
		element: <SongDetails />,
	},
];
