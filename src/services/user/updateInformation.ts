import { AxiosRequestConfig } from 'axios';
import AuthService from '@/utils/auth';
import config from 'config/api.json';
import { useRequest } from '@/hooks/useRequest';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import { ResponseHasResponseProps } from '../types';
import { Gender } from '@/utils/enums';

export type PayloadUpdateInformationUser = {
	userId: string;
	lastName: string;
	firstName: string;
	gender?: Gender;
	email: string;
	address?: string;
	avatar?: string;
	cover?: string;
};
function ServiceUpdateInformationUser(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.user._,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['UPDATE_INFORMATION_USER'],
		request,
	});

	const handleMutate = (payload: PayloadUpdateInformationUser) => {
		mutate(payload, {
			onSuccess: (data) => {
				Logger.debug('ServiceUpdateInformationUser execute handleMutate success', data);
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
				Logger.error('ServiceUpdateInformationUser execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUpdateUser: handleMutate,
		isLoadingUpdateUserService: isPending,
	};
}

export default ServiceUpdateInformationUser;
