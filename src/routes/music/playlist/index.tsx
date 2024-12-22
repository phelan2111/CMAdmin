import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { PATH } from '@/routes/config';

//ARTIST
const Playlist = lazy(() => import('@/pages/music/playlist/list'));
const PlaylistCreate = lazy(() => import('@/pages/music/playlist/create'));
const ArtistDetails = lazy(() => import('@/pages/music/artist/details'));

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
		path: PATH.MUSIC.ARTIST.DETAILS,
		element: <ArtistDetails />,
	},
];
