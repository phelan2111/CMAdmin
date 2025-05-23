import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { useRequest } from '@/hooks/useRequest';
import { ResponseHasResponseProps } from '@/services/types';
import AuthService from '@/utils/auth';
import { Helper } from '@/utils/helper';
import { Logger } from '@/utils/logger';
import { AxiosRequestConfig } from 'axios';
import config from 'config/api.json';

export type PayloadCreateTopic = {
	topicName: string;
};
function CreateTopicService(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.browse.topic._,
		method: 'put',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['GET_CREATE_BROWSE_TOPIC'],
		request,
	});

	const handleMutate = (payload: PayloadCreateTopic) => {
		mutate(payload, {
			onSuccess: (data) => {
				Logger.debug('CreateTopicService execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('CreateTopicService execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		isLoadingCreateTopic: isPending,
		onCreateTopicOfBrowse: handleMutate,
	};
}

export default CreateTopicService;
