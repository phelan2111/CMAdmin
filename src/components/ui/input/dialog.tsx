import TextField, { ITextFieldProps } from '@/components/root/inputs/textField';

interface IInputDialogProps extends ITextFieldProps {}

function InputDialog(props: IInputDialogProps) {
	return (
		<div className='animate-translateRight w-full'>
			<TextField
				classHelperText='text-red-600 font-medium !text-[12px]'
				classNameInput='!text-primary_dark'
				className='!bg-white hover:bg-white focus-within:bg-white !rounded-[4px]'
				{...props}
			/>
		</div>
	);
}

export default InputDialog;
