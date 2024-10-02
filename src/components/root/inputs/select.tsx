import { ReactNode, useState } from 'react';
import TextField from './textField';
import Popover from '../popover/normal';
import Menu from '../menu/normal';
import MenuItem from '../menu/item/normal';
import Empty from '@/components/ui/empty/normal';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
type SelectProps = {
	className?: string;
	label?: string;
	required?: boolean;
	classNameInput?: string;
	data: ItemSelect[];
	defaultSelect?: ItemSelect;
};
type RenderLabelItemProps = {
	label: string;
	index: number;
	value: string | number;
};

type ItemSelect = {
	value: string | number;
	label: string;
	renderLabel?: (renderProps: RenderLabelItemProps) => ReactNode;
};
function Select({ className = '', ...props }: SelectProps) {
	const [dataSelectState, setDataSelectState] = useState<ItemSelect | undefined>(props.defaultSelect);

	const handleSelect = (dataItem: ItemSelect) => {
		setDataSelectState(dataItem);
	};

	return (
		<div className='w-fit'>
			<Popover
				className={className}
				renderContent={({ onClose }) => {
					return (
						<Empty isEmpty={props.data.length === 0}>
							<Menu gap='gap-0'>
								{props.data.map((item, index) => {
									const { isEqual } = Helper.compareItem(item, 'value', dataSelectState?.value ?? '');

									return (
										<MenuItem
											className={isEqual ? 'bg-primary_dark text-primary_light' : 'bg-primary_light text-primary_dark'}
											onClick={() => {
												handleSelect(item);
												onClose();
											}}
											key={item.value}>
											{item.renderLabel?.({ ...item, index }) ?? Localize(item.label)}
										</MenuItem>
									);
								})}
							</Menu>
						</Empty>
					);
				}}>
				<div className='pointer-events-none'>
					<TextField value={'1'} className='!bg-white/20 hover:!shadow-none focus-within:!shadow-none' classNameInput='!text-white text-center' />
				</div>
			</Popover>
		</div>
	);
}

export default Select;
