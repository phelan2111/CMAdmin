import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '../loader/screen';
import { ReactNode } from 'react';
type LoadingDialogProps = {
	loading: boolean;
	children: ReactNode;
};

function LoadingDialog(props: LoadingDialogProps) {
	return (
		<LoadingModal loading={props.loading} loader={<LoaderScreen />}>
			{props.children}
		</LoadingModal>
	);
}

export default LoadingDialog;
