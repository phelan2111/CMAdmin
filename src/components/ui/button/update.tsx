import Button from '@/components/root/button';
import Localize from '@/langs';
import { RxUpdate } from 'react-icons/rx';

type UpdateButtonProps = {
	onClick: VoidFunction;
};
function UpdateButton(props: UpdateButtonProps) {
	return (
		<Button onClick={props.onClick} className='w-fit !bg-white !rounded-3xl !text-primary_dark hover:!bg-white/60'>
			<div className='flex gap-2 px-4 items-center'>
				<RxUpdate />
				{Localize('UPDATE')}
			</div>
		</Button>
	);
}

export default UpdateButton;
