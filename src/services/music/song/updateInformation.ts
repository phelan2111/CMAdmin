import { AxiosRequestConfig } from 'axios';
import AuthService from '@/utils/auth';
import config from 'config/api.json';
import { useRequest } from '@/hooks/useRequest';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import { ResponseHasResponseProps } from '../../types';
import { Singer } from './getDetails';
import { TypeFileSetUpSong } from '@/utils/enums';

export type PayloadUpdateInformationSong = {
	songName: string;
	image: string;
	songDescription: string;
	singers: Singer[];
	link: string;
	songId: string;
	type: TypeFileSetUpSong
};
function ServiceUpdateInformationSong(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.song._,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['UPDATE_INFORMATION_SONG'],
		request,
	});

	const handleMutate = (payload: PayloadUpdateInformationSong) => {
		mutate(payload, {
			onSuccess: (data) => {
				Logger.debug('ServiceUpdateInformationSong execute handleMutate success', data);
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
				Logger.error('ServiceUpdateInformationSong execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUpdateSong: handleMutate,
		isLoadingUpdateSongService: isPending,
	};
}

export default ServiceUpdateInformationSong;
