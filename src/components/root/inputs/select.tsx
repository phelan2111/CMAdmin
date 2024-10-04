import { ReactNode, useState } from 'react';
import TextField from './textField';
import Popover from '../popover/normal';
import Menu from '../menu/normal';
import MenuItem from '../menu/item/normal';
import Empty from '@/components/ui/empty/normal';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { IoIosArrowDown } from 'react-icons/io';
import EmptySelect from '@/components/ui/empty/select';
type SelectProps = {
	className?: string;
	label?: string;
	required?: boolean;
	classNameInput?: string;
	data: ItemSelect[];
	defaultSelect?: ItemSelect;
	onChange?: (dataItem: ItemSelect) => void;
};
type RenderLabelItemProps = {
	label: string;
	index: number;
	value: string | number;
};

export type ItemSelect = {
	value: string | number;
	label: string;
	renderLabel?: (renderProps: RenderLabelItemProps) => ReactNode;
};
function Select({ className = '', classNameInput = '!text-white text-center', ...props }: SelectProps) {
	const [dataSelectState, setDataSelectState] = useState<ItemSelect | undefined>(props.defaultSelect);

	const handleSelect = (dataItem: ItemSelect) => {
		setDataSelectState(dataItem);
		props.onChange?.(dataItem);
	};

	return (
		<div className='w-fit flex flex-col gap-1'>
			{props.label && (
				<div>
					<p>
						{Localize(props.label)} {props.required && <span className='text-red-300'>(*)</span>}
					</p>
				</div>
			)}

			<Popover
				className={className}
				renderContent={({ onClose }) => {
					return (
						<Empty
							componentEmpty={() => {
								return <EmptySelect />;
							}}
							isEmpty={props.data.length === 0}>
							<Menu className='bg-white/10 rounded-md overflow-hidden' gap='gap-0'>
								{props.data.map((item, index) => {
									const { isEqual } = Helper.compareItem(item, 'value', dataSelectState?.value ?? '');

									return (
										<MenuItem
											className={`px-2 py-1 ${isEqual ? 'bg-white/10' : 'text-primary_dark'}`}
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
				<div className='pointer-events-none bg-white/20 flex items-center px-2 rounded-md'>
					<div className='pb-1'>
						<TextField
							value={dataSelectState?.value}
							className='!bg-transparent hover:!shadow-none focus-within:!shadow-none'
							classNameInput={classNameInput}
						/>
					</div>
					<div>
						<IoIosArrowDown />
					</div>
				</div>
			</Popover>
		</div>
	);
}

export default Select;
