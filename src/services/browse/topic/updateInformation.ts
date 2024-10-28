import { AxiosRequestConfig } from 'axios';
import { ResponseHasResponseProps } from '../../types';
import AuthService from '@/utils/auth';
import config from 'config/api.json';
import { useRequest } from '@/hooks/useRequest';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';

export type PayloadTopicUpdateInformation = {
	topicId: string;
	topicName: string;
};
function ServiceUpdateInformationTopicOfBrowse(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.browse.topic._,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['UPDATE_INFORMATION_BROWSE_TOPIC'],
		request,
	});

	const handleMutate = (payload: PayloadTopicUpdateInformation) => {
		mutate(payload, {
			onSuccess: (data) => {
				Logger.debug('ServiceUpdateInformationTopicOfBrowse execute handleMutate success', data);
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
				Logger.error('ServiceUpdateInformationTopicOfBrowse execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUpdateTopicDetailsOfBrowse: handleMutate,
		isLoadingUpdateTopicDetailsOfBrowseService: isPending,
	};
}

export default ServiceUpdateInformationTopicOfBrowse;
