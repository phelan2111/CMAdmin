import Localize from '@/langs';
import { ITextFieldProps } from './textField';
import { Helper } from '@/utils/helper';
import { ReactNode, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
export type ItemRadio = {
	label?: string | ReactNode;
	value: unknown;
	id?: string;
	className?: string;
};
export interface RadioProps extends ITextFieldProps {
	data: ItemRadio[];
	classRadio?: string;
	classSelected?: string;
}

function Radio({
	name = '',
	className = 'flex-row',
	classRadio = 'bg-transparent',
	classHelperText = 'text-red-500',
	classSelected = '!bg-pink-300',
	required = false,
	...props
}: RadioProps) {
	const form = useFormContext();

	const initialValue = useMemo(() => {
		return form?.getValues()?.[name] ?? props.defaultValue;
	}, [props.defaultValue, form, name]);
	const messageError = useMemo(() => {
		return form?.formState.errors?.[name]?.message ?? props.messageError;
	}, [form?.formState.errors, name, props.messageError]);

	const [value, setValue] = useState<ItemRadio>(initialValue);

	const handleChange = (dataItem: ItemRadio) => {
		setValue(dataItem);
		form?.setValue(name, dataItem, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
	};

	return (
		<div className='flex flex-col gap-2 relative'>
			{props.label && (
				<p className='text-base'>
					{Localize(props.label)} {required && <span className='text-red-500'>(*)</span>}
				</p>
			)}
			<div className={`flex ${className} gap-4`}>
				{props.data.map((item) => {
					const hasSelected = item.id === value?.id;

					return (
						<div
							aria-hidden
							onClick={() => {
								handleChange(item);
							}}
							className={`flex group items-center gap-2 cursor-pointer ${item.className}`}
							key={item.id}>
							<div
								className={`w-6 h-6 border-4 cursor-pointer group-hover:shadow-bootstrapLarge transition-all duration-500 border-white rounded-full ${classRadio} ${
									hasSelected && classSelected
								}`}
							/>
							{typeof item.label === 'string' ? <p className='text-sm'>{Localize(item.label)}</p> : item.label}
						</div>
					);
				})}
			</div>
			{!Helper.isEmpty(messageError) && (
				<p className={`text-xs px-2 py-0.5 rounded-3xl italic text-end absolute bottom-0 right-0 translate-y-full ${classHelperText}`}>
					{messageError?.toString()}
				</p>
			)}
		</div>
	);
}

export default Radio;
