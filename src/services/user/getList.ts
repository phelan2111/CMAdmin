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
import { Role } from '@/utils/enums';

export type ResponseGetUser = {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	status: number;
	role: Role;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	token: string;
	address?: string;
	avatar?: string;
};

function ServiceGetListUser(props?: ResponseHasResponseProps[]) {
	const { onToast } = useContext(ToastContext);
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig[] = [
		{
			url: config.api.user._,
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
		keyQuery: ['GET_LIST_USER'],
		request,
	});

	const handleMutate = () => {
		mutate(undefined, {
			onSuccess: (data) => {
				Logger.debug('ServiceGetListUser execute handleMutate success', data);
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
				Logger.error('ServiceGetListUser execute handleMutate success', error.toString());
				props?.map((o) => {
					o.onError?.();
				});
			},
		});
	};

	return {
		onGetListUser: handleMutate,
		isLoadingGetListUserService: !isSuccess,
		response: useMemo(() => {
			return data.map((i) => i.data) as ResponseRequest<ResponseGetUser>[];
		}, [data]),
	};
}

export default ServiceGetListUser;
