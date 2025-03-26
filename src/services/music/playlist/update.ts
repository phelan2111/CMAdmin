import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { ResponseHasResponseProps } from '../../types';

export type PayloadUploadPlaylist = {
	playlistId: string;
	namePlaylist: string;
	descriptionPlaylist: string;
	image: string;
	theme: string;
	songs: string[];
};

export type ResponseCreatePlaylist = {
	playlistId: string;
};
function ServiceUpdatePlaylist(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.playList._,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['UPDATE_PLAYLIST'],
		request,
	});

	const handleMutate = (params: PayloadUploadPlaylist) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceUpdatePlaylist execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceUpdatePlaylist execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUpdatePlayList: handleMutate,
		isLoadingUpdateService: isPending,
	};
}

export default ServiceUpdatePlaylist;
