import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { HTMLInputTypeAttribute, ReactNode, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface ITextFieldProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange' | 'autoFocus'> {
	label?: string;
	classNameInput?: string;
	placeholder?: string;
	className?: string;
	name?: string;
	defaultValue?: string;
	type?: HTMLInputTypeAttribute;
	onChange?: (valueInput: string) => void;
	icon?: {
		direction: 'start' | 'end';
		node: ReactNode;
	};
	autoFocus?: boolean;
	messageError?: string;
}

function TextField({ classNameInput = '', className = '', name = '', type = 'text', defaultValue = '', ...props }: ITextFieldProps) {
	const { formState, getValues, register } = useFormContext();
	const initialValue = useMemo(() => {
		return getValues()?.name ?? defaultValue;
	}, [defaultValue, getValues]);
	const messageError = useMemo(() => {
		return formState.errors?.[name] ?? props.messageError;
	}, [formState.errors, name, props.messageError]);

	const [value, setValue] = useState<string>(initialValue);

	const isIconStart = props.icon?.direction === 'start';
	const isIconEnd = props.icon?.direction === 'end';

	const handleChange = (valueInput: string) => {
		setValue(valueInput);
	};

	return (
		<div className='flex flex-col gap-0.5'>
			{props.label && <p className='text-sm'>{Localize(props.label)}</p>}
			<div
				className={`relative flex h-fit bg-white items-center gap-1 hover:shadow-white transition-all duration-500 focus-within:shadow-white px-2 rounded-sm ${className}`}>
				{isIconStart && props.icon && props.icon.node}
				<input
					value={value}
					type={type}
					{...register(name)}
					name={name}
					placeholder={props.placeholder}
					className={`w-full outline-none bg-transparent h-11 text-primary_dark text-base ${classNameInput}`}
					{...props}
					onChange={(e) => {
						handleChange(e.currentTarget.value);
						props.onChange && props.onChange(e.currentTarget.value);
					}}
				/>
				{isIconEnd && props.icon && props.icon.node}
			</div>
			{!Helper.isEmpty(messageError) && <p className='text-xs text-red-300 px-2 py-0.5 rounded-3xl italic text-end'>{messageError?.toString()}</p>}
		</div>
	);
}

export default TextField;
