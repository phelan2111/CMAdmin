import { RouteObject } from 'react-router-dom';
import { PATH } from '../config';
import { lazy } from 'react';

//DASHBOARD
const Dashboard = lazy(() => import('@/pages/dashboard'));

export const routeOther: RouteObject[] = [
	{
		path: PATH.DASHBOARD,
		element: <Dashboard />,
	},
];
