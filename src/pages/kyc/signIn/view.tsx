import SignIn from '@/layout/kyc/signIn';
import { DataFormSignIn } from './types';

type ViewProps = {
	onSubmit: (dataForm: DataFormSignIn) => void;
};
function View(props: ViewProps) {
	return <SignIn onSubmit={props.onSubmit} />;
}

export default View;
