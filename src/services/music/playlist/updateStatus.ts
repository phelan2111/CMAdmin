import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { ResponseHasResponseProps } from '../../types';
import { EnumStatusPlaylist } from '@/utils/enums';

export type PayloadUploadStatusPlaylist = {
	playlistId: string;
	status: EnumStatusPlaylist;
};

export type ResponseCreatePlaylist = {
	playlistId: string;
};
function ServiceUpdateStatusPlaylist(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.playList._,
		method: 'delete',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['UPDATE_STATUS_PLAYLIST'],
		request,
	});

	const handleMutate = (params: PayloadUploadStatusPlaylist) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceUpdateStatusPlaylist execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceUpdateStatusPlaylist execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUpdateStatusPlayList: handleMutate,
		isLoadingUpdateStatusService: isPending,
	};
}

export default ServiceUpdateStatusPlaylist;
