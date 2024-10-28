import { ReactNode, useMemo, useState } from 'react';
import TextField from './textField';
import Popover from '../popover/normal';
import Menu from '../menu/normal';
import MenuItem from '../menu/item/normal';
import Empty from '@/components/ui/empty/normal';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { IoIosArrowDown } from 'react-icons/io';
import EmptySelect from '@/components/ui/empty/select';
import { useFormContext } from 'react-hook-form';
export type SelectProps = {
	className?: string;
	label?: string;
	required?: boolean;
	classNameInput?: string;
	classItem?: string;
	classActive?: string;
	classNameEmpty?: string;
	classNamePopper?: string;
	classMenuItem?: string;
	data: ItemSelect[];
	defaultSelect?: ItemSelect;
	onChange?: (dataItem: ItemSelect) => void;
	name?: string;
	classHelperText?: string;
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
function Select({
	className = 'bg-white/20',
	classNamePopper = '',
	classNameInput = '!text-white text-center',
	classHelperText = 'text-red-500',
	classItem = 'bg-white/10',
	name = '',
	classActive = 'bg-white/10',
	classMenuItem = 'px-2 py-1',
	...props
}: SelectProps) {
	const form = useFormContext();

	const messageError: string = useMemo(() => {
		return form?.formState.errors?.[name]?.message?.toString() ?? '';
	}, [form?.formState.errors, name]);

	const [dataSelectState, setDataSelectState] = useState<ItemSelect | undefined>(props.defaultSelect);

	const handleSelect = (dataItem: ItemSelect) => {
		setDataSelectState(dataItem);
		props.onChange?.(dataItem);
		form?.setValue(name, dataItem, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	return (
		<div className='w-full flex flex-col gap-1 relative'>
			{props.label && (
				<div>
					<p>
						{Localize(props.label)} {props.required && <span className='text-red-500'>(*)</span>}
					</p>
				</div>
			)}
			<Popover
				className={classNamePopper}
				renderContent={({ onClose }) => {
					return (
						<Empty
							componentEmpty={() => {
								return <EmptySelect className={props.classNameEmpty} />;
							}}
							isEmpty={props.data.length === 0}>
							<Menu className={`rounded-md overflow-hidden ${classItem}`} gap='gap-0'>
								{props.data.map((item, index) => {
									const { isEqual } = Helper.compareItem(item, 'value', dataSelectState?.value ?? '');

									return (
										<MenuItem
											className={`${classMenuItem} ${isEqual ? classActive : 'text-primary_dark'}`}
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
				<div className={`pointer-events-none flex w-full items-center px-2 rounded-md ${className}`}>
					<div className='pb-1 w-full'>
						<TextField
							key={`${dataSelectState?.label}`}
							defaultValue={dataSelectState?.label}
							className='!bg-transparent hover:!shadow-none focus-within:!shadow-none'
							classNameInput={classNameInput}
						/>
					</div>
					<IoIosArrowDown />
				</div>
			</Popover>
			{!Helper.isEmpty(messageError) && (
				<p className={`text-xs px-2 py-0.5 rounded-3xl italic text-end absolute bottom-0 right-0 translate-y-full ${classHelperText}`}>
					{messageError?.toString()}
				</p>
			)}
		</div>
	);
}

export default Select;
