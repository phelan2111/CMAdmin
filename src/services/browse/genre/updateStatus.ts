import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { ResponseHasResponseProps } from '../../types';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { EnumStatusBrowse } from '@/utils/enums';

export type ResponseGetTopicDetailsOfBrowse = {
	_id: string;
	topicName: string;
	status: EnumStatusBrowse;
	createdAt: string;
	updatedAt: string;
	__v: number;
};
export type PayloadGenreUpdateStatus = {
	genreId: string;
	status: EnumStatusBrowse;
};
function ServiceUpdateStatusGenreOfBrowse(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.browse.genre._,
		method: 'delete',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['UPDATE_STATUS_BROWSE_GENRE'],
		request,
	});

	const handleMutate = (params: PayloadGenreUpdateStatus) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceUpdateStatusGenreOfBrowse execute handleMutate success', data);
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
				Logger.error('ServiceUpdateStatusGenreOfBrowse execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUpdateGenreDetailsOfBrowse: handleMutate,
		isLoadingUpdateGenreDetailsOfBrowseService: isPending,
	};
}

export default ServiceUpdateStatusGenreOfBrowse;
