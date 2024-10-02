import { PagingState } from '@/components/root/grid/types';
import Skip from './skip';
import Take from './take';
import { useState } from 'react';
type PagingProps = {
	onChange?: (dataPaging: PagingState) => void;
	totalRecord: number;
};
function Paging(props: PagingProps) {
	const [paging, setPaging] = useState<PagingState>({
		skip: 0,
		take: 5,
	});

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
		<div className='flex items-center gap-14'>
			<Skip totalRecord={props.totalRecord} paging={paging} onChange={handleChangeSkip} />
			<Take take={paging.take} onChange={handleChangeTake} />
		</div>
	);
}

export default Paging;
