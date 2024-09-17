import { ReactNode } from 'react';

interface IPopoverProps {
	children?: ReactNode;
}
function Popover(props: IPopoverProps) {
	return <div>{props.children}</div>;
}

export default Popover;
