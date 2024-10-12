import { DataResponse, useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import { ResponseHasResponseProps } from '../types';
import { Logger } from '@/utils/logger';

type PayloadLogin = {
	email: string;
	password: string;
};
type ResponseLogin = {
	token: string;
};
function ServiceUserLogin(props?: ResponseHasResponseProps) {
	const request: AxiosRequestConfig[] = [
		{
			url: 'https://fakestoreapi.com/products/1',
			method: 'get',
		},
	];

	const { mutate, data, isPending } = useRequest({
		keyQuery: ['LOGIN'],
		request,
	});

	const handleMutate = (payload: PayloadLogin) => {
		mutate(payload, {
			onSuccess: (data) => {
				Logger.debug('ServiceUserLogin execute handleMutate success', data);
				props?.onSuccess?.(data);
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
