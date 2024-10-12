import ServiceUserLogin from '@/services/user/login';
import Controller from './controller';
import { DataFormSignIn } from './types';

function SignIn() {
	const { onLogin } = ServiceUserLogin({
		onSuccess: (dataItem) => {
			console.log('dataItem', dataItem);
		},
	});
	const handleLogin = (dataForm: DataFormSignIn) => {
		onLogin(dataForm);
	};

	return <Controller onLogin={handleLogin} />;
}

export default SignIn;
