import { Logger } from '@/utils/logger';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import config from 'config/api.json';

export type UseRequestProps = {
	request: AxiosRequestConfig[];
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
			const promises = props.request.map(async (ax) => {
				return await axios({
					...ax,
					data,
					url: `${config.api.host}${ax.url}`,
					timeout: 10000,
				})
					.then((res) => {
						return res.data;
					})
					.catch((err) => {
						Logger.error('useRequest execute axios error', err);
					});
			});
			const allResponse = Promise.all(promises).then((data) => {
				return data;
			});

			return allResponse;
		},
	});
	return mutation;
}
