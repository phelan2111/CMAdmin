import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { ResponseHasResponseProps, ResponseUpload } from '../../types';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { useMemo } from 'react';

function ServiceUploadGenreOfBrowse(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.browse.genre.upload,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending, data } = useRequest({
		keyQuery: ['UPLOAD_BROWSE_GENRE'],
		request,
	});

	const handleMutate = (params: FormData) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceUploadGenreOfBrowse execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceUploadGenreOfBrowse execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUploadGenreOfBrowse: handleMutate,
		isLoadingUploadGenreOfBrowseService: isPending,
		responseUpload: useMemo(() => {
			return data?.data as ResponseUpload;
		}, [data]),
	};
}

export default ServiceUploadGenreOfBrowse;
