import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { useMemo, useState } from 'react';

export type FilterStatusItem = {
	text: string;
	value: unknown;
	className?: string;
	id: string;
};

type FilterStatusToolProps = {
	data: FilterStatusItem[];
	onChange?: (dataItem: FilterStatusItem) => void;
};

function FilterStatusTool(props: FilterStatusToolProps) {
	const [filter, setFilter] = useState<FilterStatusItem>(props.data[0]);
	const classLeft: string = useMemo(() => {
		const { index } = Helper.findItem(props.data, 'id', filter.id);
		return `left-${index * 24}`;
	}, [filter.id, props.data]);

	const handleSelectStatus = (dataItem: FilterStatusItem) => {
		setFilter(dataItem);
		props.onChange?.(dataItem);
	};

	return (
		<div className='flex items-center gap-2'>
			<div>{Localize('STATUS')}</div>
			<div className='bg-white/10 rounded-2xl flex relative'>
				<div
					className={`w-24 p-2 h-full transition-all duration-500 absolute bg-gradient-to-r from-indigo-500 ${classLeft} to-indigo-500/30 top-0 rounded-2xl`}
				/>
				{props.data.map((item) => {
					return (
						<div
							aria-hidden
							onClick={() => {
								handleSelectStatus(item);
							}}
							key={item.id}
							className='flex items-center cursor-pointer gap-1 w-24 p-2 relative z-10 justify-center'>
							<div className={`w-2 h-2 rounded-full ${item.className}`} />
							<p className='text-sm'>{Localize(item.text)}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default FilterStatusTool;
