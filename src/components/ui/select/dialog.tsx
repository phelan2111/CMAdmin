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
				classHelperText='font-medium text-red-600'
				classNameEmpty='bg-white'
				classNamePopper='overflow-y-auto scrollHiddenY !h-40'
				classMenuItem='px-3 py-2'
				{...props}
			/>
		</div>
	);
}

export default SelectDialog;
