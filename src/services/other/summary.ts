import { useRequest } from '@/hooks/useRequest';
import { AxiosRequestConfig } from 'axios';
import { useContext, useMemo } from 'react';
import { ResponseHasResponseProps } from '../types';
import { Logger } from '@/utils/logger';
import config from 'config/api.json';
import { CODE, parseCodeToNameFunc } from '@/config/responseCode';
import { Helper } from '@/utils/helper';
import { ToastContext, ToastType } from '@/contexts/toast';
import Localize from '@/langs';
import AuthService from '@/utils/auth';

export interface Summary {
	user: ItemStatus;
	singer: ItemStatus;
	song: ItemAppearance;
	playlist: ItemAppearance;
	genre: ItemAppearance;
	topic: ItemAppearance;
}

export interface ItemAppearance {
	hidden: number;
	display: number;
	all: number;
}

export interface ItemStatus {
	active: number;
	inActive: number;
	lock: number;
	all: number;
}

function ServiceSummary(props?: ResponseHasResponseProps[]) {
	const { onToast } = useContext(ToastContext);
	const auth = AuthService.getPackageAuth();

	const request: AxiosRequestConfig = {
		url: config.api.other.summary,
		method: 'get',
		headers: {
			token: auth?.token,
		},
	};

	const { mutate, data, isSuccess } = useRequest({
		keyQuery: ['SUMMARY'],
		request,
	});

	const handleMutate = () => {
		mutate(
			{},
			{
				onSuccess: (data) => {
					Logger.debug('ServiceSummary execute handleMutate success', data);
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
					Logger.error('ServiceSummary execute handleMutate success', error.toString());
					props?.map((o) => {
						o.onError?.();
					});
				},
			},
		);
	};

	return {
		onSummary: handleMutate,
		isLoadingSummaryService: !isSuccess,
		response: useMemo(() => {
			return data?.data as Summary;
		}, [data]),
	};
}

export default ServiceSummary;
