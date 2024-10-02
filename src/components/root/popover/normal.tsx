import { ReactNode, useState } from 'react';
type RenderContentProps = {
	onClose: VoidFunction;
	onOpen: VoidFunction;
	open: boolean;
};
interface IPopoverProps {
	children?: ReactNode;
	className?: string;
	renderContent?: (renderContentProps: RenderContentProps) => ReactNode;
}
function Popover({ className = 'bg-white text-primary_dark py-2 rounded-sm -bottom-1 left-0', ...props }: IPopoverProps) {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className='relative'>
			<div className='relative' aria-hidden>
				<div className='cursor-pointer' aria-hidden onClick={handleOpen}>
					{props.children}
				</div>
				<div
					className={`absolute w-full min-w-fit transition-all duration-500 z-10 translate-y-full ${
						open ? 'opacity-100 translate-x-0' : 'opacity-0  translate-x-8 pointer-events-none'
					} ${className}`}>
					{props.renderContent?.({
						onClose: handleClose,
						onOpen: handleOpen,
						open,
					})}
				</div>
			</div>
			{open && <div aria-hidden onClick={handleClose} className='fixed z-0 bg-transparent w-screen h-screen -bottom-8 -left-8' />}
		</div>
	);
}

export default Popover;
