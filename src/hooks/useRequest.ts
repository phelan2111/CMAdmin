import { Logger } from '@/utils/logger';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import config from 'config/api.json';

export type UseRequestProps = {
	request: AxiosRequestConfig;
	keyQuery: string[];
};
export type DataResponse<T = object> = {
	code: string;
	data: T;
	message: string;
};
export function useRequest(props: UseRequestProps) {
	const mutation = useMutation({
		mutationKey: props.keyQuery,
		mutationFn: async (data: unknown) => {
			const hasMethodGet = props.request.method === 'get';
			const promise = await axios({
				...props.request,
				data: hasMethodGet ? undefined : data,
				url: `${config.api.host}${props.request.url}`,
				timeout: 10000,
				params: hasMethodGet ? data : undefined,
			})
				.then((res) => {
					return res.data;
				})
				.catch((err) => {
					Logger.error('useRequest execute axios error', err);
				});

			return promise;
		},
	});
	return mutation;
}
