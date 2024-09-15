import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './config';
import { lazy } from 'react';
import AuthWrapper from '@/components/ui/wrapper/auth';
import ThemeColor from '@/components/root/themes/color';
const SignIn = lazy(() => import('@/pages/kyc/signIn'));

const router = createBrowserRouter([
	{
		path: PATH.HOME,
		element: <ThemeColor />,
		children: [
			{
				path: PATH.KYC._,
				element: <AuthWrapper />,
				children: [
					{
						path: PATH.KYC.SIGN_IN,
						element: <SignIn />,
					},
				],
			},
		],
	},
]);

export default router;
