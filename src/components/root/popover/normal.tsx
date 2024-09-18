import { ReactNode, useState } from 'react';

interface IPopoverProps {
	children?: ReactNode;
	renderContentProps?: () => ReactNode;
}
function Popover(props: IPopoverProps) {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className='relative'>
			<div className='relative' aria-hidden onClick={handleOpen}>
				{props.children}
				<div
					className={`absolute -bottom-2 right-0 transition-all duration-500 bg-yellow-400 z-10 translate-y-full ${
						open ? 'opacity-100 translate-x-0' : 'opacity-0  translate-x-8  pointer-events-none'
					}`}>
					{props.renderContentProps?.()}
				</div>
			</div>
			{open && <div aria-hidden onClick={handleClose} className='fixed z-0 bg-transparent w-screen h-screen -bottom-8 -left-8' />}
		</div>
	);
}

export default Popover;
