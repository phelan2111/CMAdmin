import { ModalContext } from '@/contexts/modal';
import Localize from '@/langs';
import { ReactNode, useContext } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

type DialogWrapperProps = {
	children: ReactNode;
	className?: string;
	title?: string;
	description?: string;
};

function DialogWrapper({ className = '', ...props }: DialogWrapperProps) {
	const { onCloseModal, hasModal } = useContext(ModalContext);
	return (
		<div
			key={`${hasModal}`}
			className={`bg-primary_light/80 relative px-8 py-6 rounded-lg shadow-podcastsCard flex flex-col gap-8 animate-translateRight transition-all duration-100 ${className}`}>
			<div className='flex justify-between items-start gap-4'>
				<div className='flex flex-col gap-0.5'>
					{props.title && <p className='font-semibold text-xl'>{Localize(props.title)}</p>}
					{props.description && <p className='text-sm text-[#3C3D37]'>{Localize(props.description)}</p>}
				</div>
				<div
					aria-hidden
					onClick={onCloseModal}
					className='w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-300 hover:bg-black cursor-pointer hover:text-white'>
					<IoCloseCircleOutline className='text-2xl' />
				</div>
			</div>
			{props.children}
		</div>
	);
}

export default DialogWrapper;
