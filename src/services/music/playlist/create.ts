import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { ResponseHasResponseProps } from '../../types';

export type PayloadCreateSong = {
	namePlaylist: string;
	image: string;
	descriptionPlaylist: string;
	theme: string;
	songs: string[];
};

export type ResponseCreateSong = {
	songId: string;
};
function ServiceCreatePlaylist(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.playList._,
		method: 'put',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['CREATE_PLAYLIST'],
		request,
	});

	const handleMutate = (params: PayloadCreateSong) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceCreatePlaylist execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceCreatePlaylist execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onCreatePlayList: handleMutate,
		isLoadingCreateSongService: isPending,
	};
}

export default ServiceCreatePlaylist;
