import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import { ResponseHasResponseProps } from '../../types';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { initialStateItemTopic } from '@/pages/browse/variables';
import { ResponseGetTopicDetailsOfBrowse } from '../topic/getDetails';

export type ResponseGetGenreDetailsOfBrowse = {
	genreId: string;
	nameGenre: string;
	imageGenre: string;
	status: number;
	createdAt: string;
	updatedAt: string;
	topic: ResponseGetTopicDetailsOfBrowse;
};
export type PayloadGenreDetails = {
	genreId: string;
};
function ServiceGetDetailsGenreOfBrowse(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.browse.genre.details,
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
		keyQuery: ['GET_BROWSE_GENRE_DETAILS'],
		request,
	});

	const handleMutate = (params: PayloadGenreDetails) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceGetDetailsGenreOfBrowse execute handleMutate success', data);
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
				Logger.error('ServiceGetDetailsGenreOfBrowse execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onGetListTopicDetailsOfBrowse: handleMutate,
		isLoadingGetListTopicDetailsOfBrowseService: !isSuccess,
		response: useMemo(() => {
			return data.data as ResponseGetGenreDetailsOfBrowse;
		}, [data]),
	};
}

export default ServiceGetDetailsGenreOfBrowse;
