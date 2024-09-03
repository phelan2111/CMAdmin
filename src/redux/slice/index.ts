import { useAppSelector } from '@/hooks/redux';
import { dataToolControl, funcToolControl } from './toolControl';
import { dataLangue, funcLangue } from './langue';
import { dataSong } from './song';
import { dataModal, funcModal } from './modal';

export const sliceToolControl = {
	useGetState: () => useAppSelector(dataToolControl),
	func: funcToolControl,
};

export const sliceLangue = {
	useGetState: () => useAppSelector(dataLangue),
	func: funcLangue,
};

export const sliceSong = {
	useGetState: () => useAppSelector(dataSong),
	func: funcLangue,
};

export const sliceModal = {
	useGetState: () => useAppSelector(dataModal),
	func: funcModal,
};
