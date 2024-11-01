import { RouteObject } from 'react-router-dom';
import { PATH } from '../config';
import { lazy } from 'react';

//ACCOUNT
const AccountList = lazy(() => import('@/pages/account/list'));
const AccountDetails = lazy(() => import('@/pages/account/details'));
const AccountCreate = lazy(() => import('@/pages/account/create'));

export const routeAccount: RouteObject[] = [
	{
		path: PATH.ACCOUNT._,
		element: <AccountList />,
	},
	{
		path: PATH.ACCOUNT.DETAILS,
		element: <AccountDetails />,
	},
	{
		path: PATH.ACCOUNT.CREATE,
		element: <AccountCreate />,
	},
];
