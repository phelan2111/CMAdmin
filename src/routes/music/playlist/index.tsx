import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { PATH } from '@/routes/config';

//ARTIST
const Playlist = lazy(() => import('@/pages/music/playlist/list'));
const PlaylistCreate = lazy(() => import('@/pages/music/playlist/create'));
const PlaylistDetails = lazy(() => import('@/pages/music/playlist/details'));

export const routePlaylist: RouteObject[] = [
	{
		path: PATH.MUSIC.PLAYLIST._,
		element: <Playlist />,
	},
	{
		path: PATH.MUSIC.PLAYLIST.CREATE,
		element: <PlaylistCreate />,
	},
	{
		path: PATH.MUSIC.PLAYLIST.DETAILS,
		element: <PlaylistDetails />,
	},
];
