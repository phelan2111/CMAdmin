import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './config';
import { lazy } from 'react';
import AuthWrapper from '@/components/ui/wrapper/auth';
import ThemeColor from '@/components/root/themes/color';
import AdminWrapper from '@/components/ui/wrapper/admin';
import PrivateRoute from './private';
import PublicRoute from './public';

//KYC
const SignIn = lazy(() => import('@/pages/kyc/signIn'));

//DASHBOARD
const Dashboard = lazy(() => import('@/pages/dashboard'));

//ACCOUNT
const AccountList = lazy(() => import('@/pages/account/list'));

//BROWSE
const BrowseList = lazy(() => import('@/pages/browse/list'));

//ARTIST
const ArtistList = lazy(() => import('@/pages/artist/list'));

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
				children: [
					{
						path: PATH.DASHBOARD,
						element: <Dashboard />,
					},
					{
						path: PATH.ACCOUNT,
						element: <AccountList />,
					},
					{
						path: PATH.BROWSE,
						element: <BrowseList />,
					},
					{
						path: PATH.ARTIST,
						element: <ArtistList />,
					},
				],
			},
		],
	},
]);

export default router;
