import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
type RenderContentProps = {
	onClose: VoidFunction;
	onOpen: VoidFunction;
	open: boolean | undefined;
};
interface IPopoverProps {
	children?: ReactNode;
	className?: string;
	renderContent?: (renderContentProps: RenderContentProps) => ReactNode;
	renderChildren?: (renderContentProps: RenderContentProps) => ReactNode;
}
function Popover({ className = 'bg-white text-primary_dark py-2 rounded-sm -bottom-1 left-0', ...props }: IPopoverProps) {
	const [open, setOpen] = useState<boolean | undefined>(undefined);
	const ref = useRef<HTMLDivElement>(null);
	const refPopper = useRef<HTMLDivElement>(null);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useLayoutEffect(() => {
		const element = ref.current;
		const popperElement = refPopper.current;
		const wrapperElement = document.getElementById('wrapper');

		if (wrapperElement && element && popperElement) {
			const rect = element.getBoundingClientRect();
			const heightScreen = document.body.clientHeight;
			const widthHalfScreen = document.body.clientWidth / 2;
			const isCondition = rect.bottom + 128 > heightScreen;
			const isConditionLeft = rect.left > widthHalfScreen;

			if (isCondition) {
				popperElement.style.bottom = '0px';
				if (open === undefined) {
					popperElement.style.transform = `translateY(-${element.clientHeight + 4}px) translateX(${isConditionLeft ? '-24px' : '24px'})`;
				} else {
					if (open) {
						popperElement.style.transform = `translateY(-${element.clientHeight + 4}px) translateX(0px)`;
					} else {
						popperElement.style.transform = `translateY(-${element.clientHeight + 4}px) translateX(${isConditionLeft ? '-24px' : '24px'})`;
					}
				}
			} else {
				popperElement.style.top = '0px';
				if (open === undefined) {
					popperElement.style.transform = `translateY(${element.clientHeight + 4}px) translateX(${isConditionLeft ? '-24px' : '24px'})`;
				} else {
					if (open) {
						popperElement.style.transform = `translateY(${element.clientHeight + 4}px) translateX(0px)`;
						popperElement.style.height = '100%';
					} else {
						popperElement.style.transform = `translateY(${element.clientHeight + 4}px) translateX(${isConditionLeft ? '-24px' : '24px'})`;
						popperElement.style.height = '0px';
					}
				}
			}
			return () => {};
		}
	}, [ref, open]);

	return (
		<div className='w-full'>
			<div className='relative w-full' aria-hidden>
				<div ref={ref} className='cursor-pointer w-full' aria-hidden onClick={handleOpen}>
					{props.children ??
						props.renderChildren?.({
							onClose: handleClose,
							onOpen: handleOpen,
							open,
						})}
				</div>
				<div
					ref={refPopper}
					className={`absolute w-full transition-all duration-500 z-20 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${className}`}>
					{props.renderContent?.({
						onClose: handleClose,
						onOpen: handleOpen,
						open,
					})}
				</div>
			</div>
			{open && <div aria-hidden onClick={handleClose} className='fixed z-10 bg-transparent w-screen h-screen -bottom-0 -left-0' />}
		</div>
	);
}

export default Popover;
