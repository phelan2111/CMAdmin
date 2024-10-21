import { useAppSelector } from '@/hooks/redux';
import { dataLangue, funcLangue } from './langue';
import { dataModal, funcModal } from './modal';

export const sliceLangue = {
	useGetState: () => useAppSelector(dataLangue),
	func: funcLangue,
};

export const sliceModal = {
	useGetState: () => useAppSelector(dataModal),
	func: funcModal,
};
