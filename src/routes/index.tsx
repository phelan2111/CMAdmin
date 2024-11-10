import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './config';
import { lazy } from 'react';
import AuthWrapper from '@/components/ui/wrapper/auth';
import ThemeColor from '@/components/root/themes/color';
import AdminWrapper from '@/components/ui/wrapper/admin';
import PrivateRoute from './private';
import PublicRoute from './public';
import { routeBrowse } from './browse';
import { routeAccount } from './account';
import { routeOther } from './other';
import { routeArtist } from './music/artist';
import { routeSong } from './music/song';

//KYC
const SignIn = lazy(() => import('@/pages/kyc/signIn'));

const router = createBrowserRouter([
	{
		path: PATH.HOME,
		element: <ThemeColor />,
		children: [
			{
				path: PATH.KYC._,
				element: (
					<PublicRoute>
						<AuthWrapper />
					</PublicRoute>
				),
				children: [
					{
						path: PATH.KYC.SIGN_IN,
						element: <SignIn />,
					},
				],
			},
			{
				path: PATH.HOME,
				element: (
					<PrivateRoute>
						<AdminWrapper />
					</PrivateRoute>
				),
				children: [...routeOther, ...routeAccount, ...routeArtist, ...routeSong, ...routeBrowse],
			},
		],
	},
]);

export default router;
