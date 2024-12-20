import { ReactNode } from 'react';
import '@/styles/common/loader/shadow.scss';

type LoadingModalProps = {
	children: ReactNode;
	loading?: boolean;
	loader: ReactNode;
};

function LoadingModal({ loading = false, ...props }: LoadingModalProps) {

	return (
		<div className={loading ? 'opacity-40' : 'opacity-100'}>
			{loading && (
				<div className='w-full h-full absolute top-0 right-0 flex justify-center items-center rounded-lg z-20'>
					<div className='w-28 h-28 shadow-insetAllSide rounded-full flex items-center justify-center'>{props.loader}</div>
				</div>
			)}
			{props.children}
		</div>
	);
}

export default LoadingModal;
