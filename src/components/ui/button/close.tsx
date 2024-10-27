import { IoCloseCircleOutline } from 'react-icons/io5';

type CloseButtonProps = {
	onClick: VoidFunction;
};

function CloseButton(props: CloseButtonProps) {
	return (
		<div
			aria-hidden
			onClick={props.onClick}
			className='w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-300 hover:bg-black cursor-pointer hover:text-white'>
			<IoCloseCircleOutline className='text-2xl' />
		</div>
	);
}

export default CloseButton;
