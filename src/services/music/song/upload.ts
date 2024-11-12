import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { useMemo } from 'react';
import { ResponseHasResponseProps, ResponseUpload } from '../../types';

function ServiceUploadSong(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.song.upload,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending, data } = useRequest({
		keyQuery: ['UPLOAD_SONG_IMAGE'],
		request,
	});

	const handleMutate = (params: FormData) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceUploadSong execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceUploadSong execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUploadSong: handleMutate,
		isLoadingUploadSongService: isPending,
		responseUpload: useMemo(() => {
			return data?.data as ResponseUpload;
		}, [data]),
	};
}

export default ServiceUploadSong;
