import Select, { SelectProps } from '@/components/root/inputs/select';

interface ISelectDialogProps extends SelectProps {}
function SelectDialog(props: ISelectDialogProps) {
	return (
		<div className='w-full animate-translateRight'>
			<Select
				label='TOPIC'
				required
				classNameInput='!text-start !text-primary_dark'
				classActive='bg-gray-200'
				classItem='bg-white'
				className='bg-white'
				classNameEmpty='bg-white'
				{...props}
			/>
		</div>
	);
}

export default SelectDialog;
