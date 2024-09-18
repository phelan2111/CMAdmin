import { ReactNode } from 'react';

interface IMenuItemProps {
	children?: ReactNode;
	renderExpandedProps?: () => ReactNode;
	onClick?: VoidFunction;
	className?: string;
}
function MenuItem({ className = '', ...props }: IMenuItemProps) {
	return (
		<li aria-hidden onClick={props.onClick} className={`cursor-pointer pl-3 ${className}`}>
			{props.children}
		</li>
	);
}

export default MenuItem;
