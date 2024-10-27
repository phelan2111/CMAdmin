import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useContext, useMemo } from 'react';
import { PayloadRequestList, ResponseHasResponseProps, ResponseRequest } from '../../types';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import { ToastContext, ToastType } from '@/contexts/toast';
import Localize from '@/langs';
import AuthService from '@/utils/auth';
import { EnumStatusBrowse } from '@/utils/enums';

export type ResponseGetGenreOfBrowse = {
	_id: string;
	nameGenre: string;
	imageGenre: string;
	topicIdList: string[];
	status: EnumStatusBrowse;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
};

function ServiceGetListGenreOfBrowse(props?: ResponseHasResponseProps[]) {
	const { onToast } = useContext(ToastContext);
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.browse.genre._,
		method: 'get',
		headers: {
			token: auth?.token,
		},
	};

	const {
		mutate,
		data = [
			{
				list: [],
				total: 0,
			},
		],
		isSuccess,
	} = useRequest({
		keyQuery: ['GET_LIST_BROWSE_GENRE'],
		request,
	});

	const handleMutate = (params: PayloadRequestList) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceGetListGenreOfBrowse execute handleMutate success', data);
				props?.map((o, index) => {
					const funcName = parseCodeToNameFunc[data[index].code as unknown as CODE];
					const hasFunc = Helper.isEmpty(o?.[funcName as string]);
					if (hasFunc) {
						onToast({ theme: ToastType.error, label: Localize('SYSTEM_ERROR'), content: Localize('SOMETHING_WERE_WRONG') });
					} else {
						o?.[funcName as string](data[index]?.data);
					}
				});
			},
			onError: (error) => {
				Logger.error('ServiceGetListGenreOfBrowse execute handleMutate success', error.toString());
				props?.map((o) => {
					o.onError?.();
				});
			},
		});
	};

	return {
		onGetListGenreOfBrowse: handleMutate,
		isLoadingGetListGenreOfBrowseService: !isSuccess,
		response: useMemo(() => {
			return data.data as ResponseRequest<ResponseGetGenreOfBrowse>;
		}, [data]),
	};
}

export default ServiceGetListGenreOfBrowse;
