import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { ResponseHasResponseProps } from '../../types';
import { EnumStatusBrowse } from '@/utils/enums';

export type PayloadCreateSinger = {
	singerDescription: string;
	singerCover: string[];
	singerAvatar: string;
	singerName: string;
	socials?: {
		facebook?: string;
		instagram?: string;
	};
	genres: GenreOfSinger[];
};
export type ResponseCreate = {
	singerId: string;
};
export type GenreOfSinger = {
	nameGenre: string;
	imageGenre: string;
	status: EnumStatusBrowse;
	genreId: string;
};
function ServiceCreateSinger(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.artist._,
		method: 'put',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['CREATE_SINGER'],
		request,
	});

	const handleMutate = (params: PayloadCreateSinger) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceCreateSinger execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceCreateSinger execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onCreateSinger: handleMutate,
		isLoadingCreateSingerService: isPending,
	};
}

export default ServiceCreateSinger;
