import { AxiosRequestConfig } from 'axios';
import AuthService from '@/utils/auth';
import config from 'config/api.json';
import { useRequest } from '@/hooks/useRequest';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import { ResponseHasResponseProps } from '../../types';
import { GenresOfArtist } from './getDetails';

export type PayloadUpdateInformationArtist = {
	singerName: string;
	singerAvatar: string;
	singerCover: string[];
	singerDescription: string;
	socials?: {
		facebook?: string;
		instagram?: string;
	};
	singerId: string;
	genres: GenresOfArtist[];
};
function ServiceUpdateInformationArtist(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.artist._,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['UPDATE_INFORMATION_ARTIST'],
		request,
	});

	const handleMutate = (payload: PayloadUpdateInformationArtist) => {
		mutate(payload, {
			onSuccess: (data) => {
				Logger.debug('ServiceUpdateInformationArtist execute handleMutate success', data);
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
				Logger.error('ServiceUpdateInformationArtist execute handleMutate error', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onUpdateArtist: handleMutate,
		isLoadingUpdateArtistService: isPending,
	};
}

export default ServiceUpdateInformationArtist;
