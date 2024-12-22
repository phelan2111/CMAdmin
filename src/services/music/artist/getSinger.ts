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
import { EnumStatusArtist } from '@/utils/enums';

export type ResponseGetListArtist = {
	_id: string;
	singerName: string;
	singerAvatar: string;
	singerCover: string[];
	singerDescription: string;
	followers: number;
	socials?: ContactArtist;
	createdAt: string;
	updatedAt: string;
	status: EnumStatusArtist;
	__v: number;
};

export type ContactArtist = {
	facebook?: string;
	instagram?: string;
	x?: string;
};

function ServiceArtistGetList(props?: ResponseHasResponseProps[]) {
	const { onToast } = useContext(ToastContext);
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.artist._,
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
				Logger.debug('ServiceArtistGetList execute handleMutate success', data);
				props?.map((o, index) => {
					const funcName = parseCodeToNameFunc[data[index].code as unknown as CODE];
					const hasFunc = Helper.isEmpty(o?.[funcName as string]);
					if (hasFunc) {
						onToast({ theme: ToastType.error, label: Localize('SYSTEM_ERROR'), content: Localize('SOMETHING_WERE_WRONG') });
					} else {
						o?.[funcName as string](data[index]?.data);
					}
				});
			},
			onError: (error) => {
				Logger.error('ServiceArtistGetList execute handleMutate success', error.toString());
				props?.map((o) => {
					o.onError?.();
				});
			},
		});
	};

	return {
		onGetListArtist: handleMutate,
		isLoadingGetListArtistService: !isSuccess,
		response: useMemo(() => {
			return data.data as ResponseRequest<ResponseGetListArtist>;
		}, [data]),
	};
}

export default ServiceArtistGetList;
