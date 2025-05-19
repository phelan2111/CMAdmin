import { DataResponse, useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useContext, useMemo } from 'react';
import { ResponseHasResponseProps } from '../types';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import { ToastContext, ToastType } from '@/contexts/toast';
import Localize from '@/langs';

type PayloadLogin = {
	email: string;
	password: string;
};
export type ResponseLogin = {
	info: {
		email: string;
		firstName: string;
		lastName: string;
		role: number;
	};
	token: string;
};

function ServiceUserLogin(props?: ResponseHasResponseProps) {
	const { onToast } = useContext(ToastContext);

	const request: AxiosRequestConfig = {
		url: config.api.user.login,
		method: 'post',
	};

	const { mutate, data, isPending } = useRequest({
		keyQuery: ['LOGIN'],
		request,
	});

	const handleMutate = (payload: PayloadLogin) => {
		mutate(payload, {
			onSuccess: (data) => {
				Logger.debug('ServiceUserLogin execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					onToast({ theme: ToastType.error, label: Localize('SYSTEM_ERROR'), content: Localize('SOMETHING_WERE_WRONG') });
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceUserLogin execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onLogin: handleMutate,
		isLoadingLoginService: isPending,
		response: useMemo(() => {
			return data as unknown as DataResponse<ResponseLogin>;
		}, [data]),
	};
}

export default ServiceUserLogin;
