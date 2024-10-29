import Button from '@/components/root/button';
import Localize from '@/langs';
import { ReactNode } from 'react';
import { RxUpdate } from 'react-icons/rx';

type UpdateButtonProps = {
	onClick: VoidFunction;
	text?: string;
	icon?: ReactNode;
	className?: string;
	disabled?: boolean;
};
function UpdateButton({ icon = <RxUpdate />, text = 'UPDATE', className = '', ...props }: UpdateButtonProps) {
	return (
		<Button disabled={props.disabled} onClick={props.onClick} className={`w-fit !bg-white !rounded-3xl !text-primary_dark hover:!bg-white/60 ${className}`}>
			<div className='flex gap-2 px-4 items-center justify-center'>
				{icon}
				{Localize(text)}
			</div>
		</Button>
	);
}

export default UpdateButton;
