import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import { ResponseHasResponseProps } from '../../types';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { EnumStatusBrowse } from '@/utils/enums';
import { initialStateItemTopic } from '@/pages/browse/variables';

export type ResponseGetTopicDetailsOfBrowse = {
	_id: string;
	topicName: string;
	status: EnumStatusBrowse;
	createdAt: string;
	updatedAt: string;
	__v: number;
};
export type PayloadTopicDetails = {
	topicId: string;
};
function ServiceGetDetailsTopicOfBrowse(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.browse.topic.details,
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
		keyQuery: ['GET_LIST_BROWSE_TOPIC_DETAILS'],
		request,
	});

	const handleMutate = (params: PayloadTopicDetails) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceGetDetailsTopicOfBrowse execute handleMutate success', data);
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
				Logger.error('ServiceGetDetailsTopicOfBrowse execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onGetListTopicDetailsOfBrowse: handleMutate,
		isLoadingGetListTopicDetailsOfBrowseService: !isSuccess,
		response: useMemo(() => {
			return data.data as ResponseGetTopicDetailsOfBrowse;
		}, [data]),
	};
}

export default ServiceGetDetailsTopicOfBrowse;
