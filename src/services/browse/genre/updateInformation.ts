import { AxiosRequestConfig } from 'axios';
import { ResponseHasResponseProps } from '../../types';
import AuthService from '@/utils/auth';
import config from 'config/api.json';
import { useRequest } from '@/hooks/useRequest';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';

export type PayloadGenreUpdateInformation = {
	topicId: string;
	imageGenre: string;
	genreId: string;
	nameGenre: string;
};
function ServiceUpdateInformationGenreOfBrowse(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.browse.genre._,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['UPDATE_INFORMATION_BROWSE_GENRE'],
		request,
	});

	const handleMutate = (payload: PayloadGenreUpdateInformation) => {
		mutate(payload, {
			onSuccess: (data) => {
				Logger.debug('ServiceUpdateInformationGenreOfBrowse execute handleMutate success', data);
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
				Logger.error('ServiceUpdateInformationGenreOfBrowse execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUpdateGenreDetailsOfBrowse: handleMutate,
		isLoadingUpdateGenreDetailsOfBrowseService: isPending,
	};
}

export default ServiceUpdateInformationGenreOfBrowse;
