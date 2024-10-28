import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { ResponseHasResponseProps } from '../../types';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';

export type PayloadCreateGenre = {
	nameGenre: string;
	imageGenre: string;
	topicId: string;
};
function ServiceCreateGenreOfBrowse(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.browse.genre._,
		method: 'put',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['CREATE_BROWSE_GENRE'],
		request,
	});

	const handleMutate = (params: PayloadCreateGenre) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceCreateGenreOfBrowse execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceCreateGenreOfBrowse execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onCreateGenreOfBrowse: handleMutate,
		isLoadingCreateGenreOfBrowseService: isPending,
	};
}

export default ServiceCreateGenreOfBrowse;
