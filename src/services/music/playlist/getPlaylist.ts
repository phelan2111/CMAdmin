import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { PayloadRequestList, ResponseHasResponseProps, ResponseRequest } from '../../types';
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

function ServiceGetListPlaylist(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.playList._,
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

	const handleMutate = (params: PayloadRequestList) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceGetListPlaylist execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceGetListPlaylist execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onGetPlayList: handleMutate,
		isLoadingCreateSongService: isPending,
		response: useMemo(() => {
			return data.data as ResponseRequest<ResponsePlaylist>;
		}, [data]),
	};
}

export default ServiceGetListPlaylist;
