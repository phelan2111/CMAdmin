import { ReactNode } from 'react';

interface IMenuItemProps {
	children?: ReactNode;
	renderExpandedProps?: () => ReactNode;
	onClick?: VoidFunction;
	className?: string;
}
function MenuItem({ className = '', ...props }: IMenuItemProps) {
	return (
		<li aria-hidden onClick={props.onClick} className={`cursor-pointer`}>
			<div className={`px-3 py-2 transition-all duration-300 ${className}`}>{props.children}</div>
		</li>
	);
}

export default MenuItem;
