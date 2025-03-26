import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { ResponseHasResponseProps } from '../../types';
import { useMemo } from 'react';
import { EnumStatusPlaylist } from '@/utils/enums';

export type ResponseCreatePlaylist = {
	playlistId: string;
};

export type ResponsePlaylist = {
	playlistId: string;
	namePlaylist: string;
	descriptionPlaylist: string;
	image: string;
	userId: string;
	updatedAt: string;
	createdAt: string;
	songs: string[];
	viewSaves: number;
	status: EnumStatusPlaylist;
};

export type ResponsePlaylistDetails = {
	playlistId: string;
	namePlaylist: string;
	descriptionPlaylist: string;
	image: string;
	userId: string;
	updatedAt: string;
	createdAt: string;
	songs: ItemSongOfPlaylist[];
	viewSaves: number;
	status: number;
	theme: string;
};

export type ItemSongOfPlaylist = {
	songName: string;
	image: string;
	songDescription: string;
	link: string;
	views: number;
	status: number;
	songId: string;
	type: number;
	singers: ItemSingerOfPlaylist[];
};

export type ItemSingerOfPlaylist = {
	singerName: string;
	singerAvatar: string;
	singerId: string;
	status: number;
	followers: number;
};

export const initialPlaylistDetails: ResponsePlaylistDetails = {
	playlistId: '',
	namePlaylist: '',
	descriptionPlaylist: '',
	image: '',
	userId: '',
	updatedAt: '',
	createdAt: '',
	songs: [],
	viewSaves: 0,
	status: 1,
	theme: '',
};

export type PayloadPlaylistDetails = {
	playlistId: string;
};

function ServiceGetPlaylistDetails(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.playList.details,
		method: 'get',
		headers: {
			token: auth?.token,
		},
	};

	const {
		mutate,
		isPending,
		data = [
			{
				list: [],
				total: 0,
			},
		],
	} = useRequest({
		keyQuery: ['CREATE_PLAYLIST'],
		request,
	});

	const handleMutate = (params: PayloadPlaylistDetails) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceGetPlaylistDetails execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceGetPlaylistDetails execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onPlayListDetails: handleMutate,
		isLoadingCreateSongService: isPending,
		response: useMemo(() => {
			return data.data as ResponsePlaylistDetails;
		}, [data]),
	};
}

export default ServiceGetPlaylistDetails;
