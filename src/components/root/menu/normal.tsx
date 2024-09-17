import { ReactNode } from 'react';

interface IMenuProps {
	children: ReactNode;
	gap?: string;
}
function Menu({ gap = 'gap-2', ...props }: IMenuProps) {
	return <ul className={`flex flex-col ${gap}`}>{props.children}</ul>;
}

export default Menu;
