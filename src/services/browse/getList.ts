import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useContext, useMemo } from 'react';
import { ResponseHasResponseProps, ResponseRequest } from '../types';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import { ToastContext, ToastType } from '@/contexts/toast';
import Localize from '@/langs';
import AuthService from '@/utils/auth';
import { EnumStatusBrowse } from '@/utils/enums';

export type ResponseGetBrowse = {
	_id: string;
	nameBrowse: string;
	imageBrowse: string;
	playlistId: string[];
	status: EnumStatusBrowse;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
};

function ServiceGetListBrowse(props?: ResponseHasResponseProps[]) {
	const { onToast } = useContext(ToastContext);
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig[] = [
		{
			url: config.api.browse._,
			method: 'get',
			headers: {
				token: auth?.token,
			},
		},
	];

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
		keyQuery: ['GET_LIST_BROWSE'],
		request,
	});

	const handleMutate = () => {
		mutate(undefined, {
			onSuccess: (data) => {
				Logger.debug('ServiceGetListBrowse execute handleMutate success', data);
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
				Logger.error('ServiceGetListBrowse execute handleMutate success', error.toString());
				props?.map((o) => {
					o.onError?.();
				});
			},
		});
	};

	return {
		onGetListBrowse: handleMutate,
		isLoadingGetListBrowseService: !isSuccess,
		response: useMemo(() => {
			return data.map((i) => i.data) as ResponseRequest<ResponseGetBrowse>[];
		}, [data]),
	};
}

export default ServiceGetListBrowse;
