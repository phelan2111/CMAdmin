import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
export type UseRequestProps = {
	request: AxiosRequestConfig[];
	keyQuery: string[];
};
export function useRequest(props: UseRequestProps) {
	const query = useQuery({
		queryKey: props.keyQuery,
		queryFn: async () => {
			const promises = props.request.map(async (ax) => {
				return await axios.create(ax);
			});
			const allResponse = Promise.all(promises).then((data: unknown) => {
				return data;
			});
			return allResponse;
		},
		staleTime: 1000,
	});
	return query;
}
