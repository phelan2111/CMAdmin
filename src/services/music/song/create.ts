import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { ResponseHasResponseProps } from '../../types';
import { EnumStatusArtist, TypeFileSetUpSong } from '@/utils/enums';

export type PayloadCreateSong = {
	songName: string;
	image: string;
	songDescription: string;
	singers: SingerOfSong[];
	link: string;
	type: TypeFileSetUpSong;
	duration?: number;
};
export type SingerOfSong = {
	singerId: string;
	singerName: string;
	singerAvatar: string;
	singerCover: string[];
	singerDescription: string;
	followers: number;
	socials?: object;
	status: EnumStatusArtist;
};
export type ResponseCreateSong = {
	songId: string;
};
function ServiceCreateSong(props?: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.song._,
		method: 'put',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, isPending } = useRequest({
		keyQuery: ['CREATE_SONG'],
		request,
	});

	const handleMutate = (params: PayloadCreateSong) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceCreateSong execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (hasFunc) {
					Logger.error('Not Found func', funcName);
				} else {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error) => {
				Logger.error('ServiceCreateSong execute handleMutate success', error.toString());
				props?.onError?.();
			},
		});
	};

	return {
		onCreateSong: handleMutate,
		isLoadingCreateSongService: isPending,
	};
}

export default ServiceCreateSong;
