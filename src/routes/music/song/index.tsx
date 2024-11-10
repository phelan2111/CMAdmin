import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { PATH } from '@/routes/config';

//ARTIST
const SongList = lazy(() => import('@/pages/music/song/list'));
const SongCreate = lazy(() => import('@/pages/music/song/create'));
const ArtistDetails = lazy(() => import('@/pages/music/artist/details'));

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
		path: PATH.MUSIC.ARTIST.DETAILS,
		element: <ArtistDetails />,
	},
];
