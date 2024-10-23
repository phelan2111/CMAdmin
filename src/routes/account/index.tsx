import { RouteObject } from 'react-router-dom';
import { PATH } from '../config';
import { lazy } from 'react';

//ACCOUNT
const AccountList = lazy(() => import('@/pages/account/list'));

export const routeAccount: RouteObject[] = [
	{
		path: PATH.ACCOUNT._,
		element: <AccountList />,
	},
];
