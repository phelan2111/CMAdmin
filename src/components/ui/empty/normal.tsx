import { Fragment, ReactNode } from 'react';
import EmptyComponent from '../common/empty';

export type EmptyProps = {
	componentEmpty?: () => ReactNode;
	isEmpty: boolean;
	children: ReactNode;
};

function Empty(props: EmptyProps) {
	if (!props.isEmpty) {
		return <Fragment>{props.children}</Fragment>;
	}
	return <div>{props.componentEmpty?.() ?? <EmptyComponent />}</div>;
}

export default Empty;
