import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { HTMLInputTypeAttribute, ReactNode, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface ITextAreaFieldProps
	extends Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'onChange' | 'autoFocus'> {
	label?: string;
	classNameTextArea?: string;
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

function TextAreaField({ classNameTextArea = '', className = '', name = '', required = false, defaultValue = '', ...props }: ITextAreaFieldProps) {
	const form = useFormContext();

	const initialValue = useMemo(() => {
		return form?.getValues()?.name ?? defaultValue;
	}, [defaultValue, form]);
	const messageError = useMemo(() => {
		return form?.formState.errors?.[name] ?? props.messageError;
	}, [form?.formState.errors, name, props.messageError]);

	const [value, setValue] = useState<string>(initialValue);

	const isIconStart = props.icon?.direction === 'start';
	const isIconEnd = props.icon?.direction === 'end';

	const handleChange = (valueInput: string) => {
		setValue(valueInput);
	};

	return (
		<div className='flex flex-col gap-1'>
			{props.label && (
				<p className='text-base'>
					{Localize(props.label)} {required && <span className='text-red-500'>(*)</span>}
				</p>
			)}
			<div
				className={`relative flex h-fit bg-white/10 items-center gap-1 hover:bg-white/40 transition-all duration-500 focus-within:bg-white/40 px-2 rounded-sm ${className}`}>
				{isIconStart && props.icon && props.icon.node}
				<textarea
					value={value}
					{...form?.register(name)}
					name={name}
					placeholder={props.placeholder}
					className={`w-full outline-none bg-transparent h-40 text-primary_light text-base ${classNameTextArea}`}
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

export default TextAreaField;
