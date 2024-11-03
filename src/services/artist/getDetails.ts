import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { initialStateItemTopic } from '@/pages/browse/variables';
import { ResponseHasResponseProps } from '../types';
import { EnumStatusBrowse } from '@/utils/enums';

export type ResponseGetArtistDetails = {
	createdAt: string;
	updatedAt: string;
	singerName: string;
	singerAvatar: string;
	singerCover: string[];
	singerDescription: string;
	followers: number;
	status: number;
	genres: GenresOfArtist[];
	singerId: string;
	socials?: {
		facebook?: string;
		instagram?: string;
	};
};
export type GenresOfArtist = {
	genreId: string;
	nameGenre: string;
	imageGenre: string;
	status: EnumStatusBrowse;
};
export const initialArtistDetails: ResponseGetArtistDetails = {
	createdAt: '',
	updatedAt: '',
	singerName: 'n',
	singerAvatar: '',
	singerCover: [],
	singerDescription: '',
	followers: 0,
	status: 1,
	genres: [],
	singerId: '',
};

export type PayloadArtistDetails = {
	artistId: string;
};
function ServiceArtistDetails(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.artist.details,
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
		keyQuery: ['GET_USER_DETAILS'],
		request,
	});

	const handleMutate = (params: PayloadArtistDetails) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceArtistDetails execute handleMutate success', data);
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
				Logger.error('ServiceArtistDetails execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onArtistDetails: handleMutate,
		isLoadingArtistDetailsService: !isSuccess,
		response: useMemo(() => {
			return data.data as ResponseGetArtistDetails;
		}, [data]),
	};
}

export default ServiceArtistDetails;
