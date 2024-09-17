import { ReactNode } from 'react';

interface IMenuItemProps {
	children?: ReactNode;
	renderExpandedProps?: () => ReactNode;
	onClick?: VoidFunction;
}
function MenuItem(props: IMenuItemProps) {
	return (
		<li aria-hidden onClick={props.onClick} className='cursor-pointer pl-3'>
			{props.children}
		</li>
	);
}

export default MenuItem;
