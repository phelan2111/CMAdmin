import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { initialStateItemTopic } from '@/pages/browse/variables';
import { ResponseHasResponseProps } from '../../types';
import { EnumStatusArtist, TypeFileSetUpSong } from '@/utils/enums';

export type ResponseGetSongDetails = {
	songName: string;
	image: string;
	songDescription: string;
	link: string;
	views: number;
	status: number;
	songId: string;
	createdAt: string;
	updatedAt: string;
	singer: Singer[];
	type: TypeFileSetUpSong
};
export interface Singer {
	createdAt: string;
	updatedAt: string;
	singerName: string;
	singerAvatar: string;
	singerCover: string[];
	singerDescription: string;
	followers: number;
	status: EnumStatusArtist;
	singerId: string;
	socials?: Socials;
}

export interface Socials {
	facebook?: string;
	instagram?: string;
	x?: string;
}
export const initialSongDetails: ResponseGetSongDetails = {
	songName: '',
	image: '',
	songDescription: '',
	link: '',
	views: 0,
	status: EnumStatusArtist.active,
	songId: '',
	createdAt: '',
	updatedAt: '',
	singer: [],
	type: TypeFileSetUpSong.video
};

export type PayloadSongDetails = {
	songId: string;
};
function ServiceSongDetails(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.song.details,
		method: 'get',
		headers: {
			token: auth?.token,
		},
	};

	const {
		mutate,
		data = initialStateItemTopic,
		isSuccess,
	} = useRequest({
		keyQuery: ['GET_SONG_DETAILS'],
		request,
	});

	const handleMutate = (params: PayloadSongDetails) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceSongDetails execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				if (!Helper.isEmpty(props)) {
					const hasFunc = Helper.isEmpty(props?.[funcName as string]);
					if (hasFunc) {
						Logger.error('Not Found func', funcName);
					} else {
						props?.[funcName as string](data?.data);
					}
				}
			},
			onError: (error) => {
				Logger.error('ServiceSongDetails execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onSongDetails: handleMutate,
		isLoadingSongDetailsService: !isSuccess,
		response: useMemo(() => {
			return data.data as ResponseGetSongDetails;
		}, [data]),
	};
}

export default ServiceSongDetails;
