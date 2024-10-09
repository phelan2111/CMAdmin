import Controller from './controller';
import { DataFormSignIn } from './types';

function SignIn() {
	const handleLogin = (dataForm: DataFormSignIn) => {
		console.log('dataForm', dataForm);
	};

	return <Controller onLogin={handleLogin} />;
}

export default SignIn;
