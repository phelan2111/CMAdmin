import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { Gender, Role } from '@/utils/enums';
import { ResponseHasResponseProps } from '../types';

export type PayloadCreateUser = {
	lastName: string;
	firstName: string;
	gender: Gender;
	email: string;
	address?: string;
	role: Role;
	cover: string;
	avatar: string;
};

export type ResponseCreate = {
	userId: string;
};
function ServiceCreateUser(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.user._,
		method: 'put',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['CREATE_USER'],
		request,
	});

	const handleMutate = (payload: PayloadCreateUser) => {
		mutate(payload, {
			onSuccess: (data) => {
				Logger.debug('ServiceCreateUser execute handleMutate success', data);
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
				Logger.error('ServiceCreateUser execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onCreateUser: handleMutate,
		isLoadingCreateUserService: isPending,
	};
}

export default ServiceCreateUser;
