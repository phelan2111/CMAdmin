import { Outlet } from 'react-router-dom';
import Toast from '../toast/normal';

function ThemeColor() {
	return (
		<div className='dark'>
			<Outlet />
			<Toast />
		</div>
	);
}

export default ThemeColor;
