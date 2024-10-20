import SignIn from '@/layout/kyc/signIn';
import { DataFormSignIn } from './types';
import Loading from '@/components/root/loading/normal';

type ViewProps = {
	onSubmit: (dataForm: DataFormSignIn) => void;
	isLoading: boolean;
};
function View(props: ViewProps) {
	return (
		<Loading className='top-0 right-0' isLoading={props.isLoading}>
			<SignIn onSubmit={props.onSubmit} />;
		</Loading>
	);
}

export default View;
