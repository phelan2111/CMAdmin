import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useContext, useMemo } from 'react';
import { PayloadRequestList, ResponseHasResponseProps, ResponseRequest } from '../../types';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import { ToastContext, ToastType } from '@/contexts/toast';
import Localize from '@/langs';
import AuthService from '@/utils/auth';
import { EnumStatusSong, TypeFileSetUpSong } from '@/utils/enums';
import { ResponseGetListArtist } from '../artist/getSinger';

export type ResponseGetListSong = {
	songName: string;
	image: string;
	songDescription: string;
	link: string;
	views: number;
	status: EnumStatusSong;
	songId: string;
	createdAt: string;
	updatedAt: string;
	singers: ResponseGetListArtist[];
	type: TypeFileSetUpSong;
	duration?: number;
};

function ServiceSongGetList(props?: ResponseHasResponseProps[]) {
	const { onToast } = useContext(ToastContext);
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.song._,
		method: 'get',
		headers: {
			token: auth?.token,
		},
	};
	const {
		mutate,
		data = [
			{
				list: [],
				total: 0,
			},
		],
		isSuccess,
	} = useRequest({
		keyQuery: ['GET_LIST_ARTIST'],
		request,
	});

	const handleMutate = (params: PayloadRequestList) => {
		mutate(params, {
			onSuccess: (data) => {
				Logger.debug('ServiceSongGetList execute handleMutate success', data);
				props?.map((o) => {
					const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
					const hasFunc = Helper.isEmpty(o?.[funcName as string]);
					if (hasFunc) {
						onToast({ theme: ToastType.error, label: Localize('SYSTEM_ERROR'), content: Localize('SOMETHING_WERE_WRONG') });
					} else {
						o?.[funcName as string](data?.data);
					}
				});
			},
			onError: (error) => {
				Logger.error('ServiceSongGetList execute handleMutate success', error.toString());
				props?.map((o) => {
					o.onError?.();
				});
			},
		});
	};

	return {
		onGetListSong: handleMutate,
		isLoadingGetListSongService: !isSuccess,
		response: useMemo(() => {
			return data.data as ResponseRequest<ResponseGetListSong>;
		}, [data]),
	};
}

export default ServiceSongGetList;
