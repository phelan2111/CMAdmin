import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { initialStateItemTopic } from '@/pages/browse/variables';
import { ResponseHasResponseProps } from '../types';
import { EnumStatusAccount, Gender, Role } from '@/utils/enums';

export type ResponseGetUserDetails = {
	createdAt: string;
	email: string;
	firstName: string;
	lastName: string;
	role: Role;
	status: EnumStatusAccount;
	updatedAt: string;
	userId: string;
	cover?: string;
	avatar?: string;
	address?: string;
	gender?: Gender;
};
export type PayloadUserDetails = {
	userId: string;
};
function ServiceUserDetails(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.user.details,
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
		keyQuery: ['GET_USER_DETAILS'],
		request,
	});

	const handleMutate = (params: PayloadUserDetails) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceUserDetails execute handleMutate success', data);
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
				Logger.error('ServiceUserDetails execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUserDetails: handleMutate,
		isLoadingUserDetailsService: !isSuccess,
		response: useMemo(() => {
			return data.data as ResponseGetUserDetails;
		}, [data]),
	};
}

export default ServiceUserDetails;
