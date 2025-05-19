import ServiceUserLogin, { ResponseLogin } from '@/services/user/login';
import Controller from './controller';
import { DataFormSignIn } from './types';
import AuthService from '@/utils/auth';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { ToastContext, ToastType } from '@/contexts/toast';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';

function SignIn() {
	const { onToast } = useContext(ToastContext);
	const { redirectPage } = useRedirect();

	const { onLogin, isLoadingLoginService } = ServiceUserLogin({
		onSuccess: (dataItem) => {
			const res = dataItem as ResponseLogin;
			const expireAt = dayjs().unix() * 180000;
			AuthService.setPackageAuth(
				{
					token: res.token,
				},
				dayjs().unix() * 18000,
			);
			AuthService.setPackageProfile(res.info, expireAt);
			redirectPage(PATH.DASHBOARD);
		},
		onWrongPassword: () => {
			onToast({ theme: ToastType.error, label: 'ACCOUNT_WRONG', content: 'USERNAME_OR_PASSWORD' });
		},
		onSystemError: () => {
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});
	const handleLogin = (dataForm: DataFormSignIn) => {
		onLogin(dataForm);
	};

	return <Controller isLoading={isLoadingLoginService} onLogin={handleLogin} />;
}

export default SignIn;
