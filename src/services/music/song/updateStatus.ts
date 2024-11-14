import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { EnumStatusSong } from '@/utils/enums';
import { ResponseHasResponseProps } from '../../types';

export type PayloadSongUpdateStatus = {
	songId: string;
	status: EnumStatusSong;
};
function ServiceUpdateStatusSong(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.song._,
		method: 'delete',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['UPDATE_STATUS_SONG'],
		request,
	});

	const handleMutate = (params: PayloadSongUpdateStatus) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceUpdateStatusSong execute handleMutate success', data);
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
				Logger.error('ServiceUpdateStatusSong execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUpdateStatusSong: handleMutate,
		isLoadingUpdateStatusSongService: isPending,
	};
}

export default ServiceUpdateStatusSong;
