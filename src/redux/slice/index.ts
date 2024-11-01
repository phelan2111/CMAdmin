import { useAppSelector } from '@/hooks/redux';
import { dataLangue, funcLangue } from './langue';
import { dataBreadcrumb, funcBreadcrumb } from './breadcrumb';

export const sliceLangue = {
	useGetState: () => useAppSelector(dataLangue),
	func: funcLangue,
};

export const sliceBreadcrumb = {
	useGetState: () => useAppSelector(dataBreadcrumb),
	func: funcBreadcrumb,
};
