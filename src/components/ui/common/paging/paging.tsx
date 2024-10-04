import { PagingState } from '@/components/root/grid/types';
import Skip from './skip';
import Take from './take';
import { Fragment, useMemo, useState } from 'react';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
type PagingProps = {
	onChange?: (dataPaging: PagingState) => void;
	totalRecord: number;
};
function Paging(props: PagingProps) {
	const [paging, setPaging] = useState<PagingState>({
		skip: 0,
		take: 5,
	});

	const showing = useMemo(() => {
		const showTotal = (paging.skip + 1) * paging.take;
		if (showTotal > props.totalRecord) {
			return props.totalRecord;
		}
		return showTotal;
	}, [paging.skip, paging.take, props.totalRecord]);

	const handleChangeSkip = (skip: number) => {
		setPaging((prev) => ({ ...prev, skip }));
		props.onChange?.({
			...paging,
			skip: skip * paging.take,
		});
	};
	const handleChangeTake = (take: number) => {
		const pagingValues = { take, skip: 0 };
		setPaging(pagingValues);
		props.onChange?.(pagingValues);
	};

	return (
		<Fragment>
			<div className='flex items-center gap-2'>
				<p>{Localize('SHOWING')}</p>
				<b>{Helper.formatNumber(showing)}</b>
				<span>
					{Localize('OF')} {Helper.formatNumber(props.totalRecord)}
				</span>
			</div>
			<div className='flex items-center gap-14'>
				<Skip totalRecord={props.totalRecord} paging={paging} onChange={handleChangeSkip} />
				<Take take={paging.take} onChange={handleChangeTake} />
			</div>
		</Fragment>
	);
}

export default Paging;
