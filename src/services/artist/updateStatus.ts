import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { EnumStatusAccount } from '@/utils/enums';
import { ResponseHasResponseProps } from '../types';

export type PayloadUserUpdateStatus = {
	userId: string;
	status: EnumStatusAccount;
};
function ServiceUpdateStatusArtist(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.user._,
		method: 'delete',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['UPDATE_STATUS_USER'],
		request,
	});

	const handleMutate = (params: PayloadUserUpdateStatus) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceUpdateStatusArtist execute handleMutate success', data);
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
				Logger.error('ServiceUpdateStatusArtist execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUpdateStatusUser: handleMutate,
		isLoadingUpdateStatusUserService: isPending,
	};
}

export default ServiceUpdateStatusArtist;
