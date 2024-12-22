import TextField, { ITextFieldProps } from '@/components/root/inputs/textField';

interface IInputProps extends ITextFieldProps {}

function Input({ className = '!bg-white/80 hover:bg-white focus-within:bg-white !rounded-[4px]', ...props }: IInputProps) {
	return (
		<div className='animate-translateRight w-full'>
			<TextField classHelperText='text-red-600 font-medium !text-[12px]' classNameInput='!text-primary_dark' className={className} {...props} />
		</div>
	);
}

export default Input;
