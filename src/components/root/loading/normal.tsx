import LoaderScreen from '@/components/ui/loader/screen';
import { Fragment, ReactNode } from 'react';
type RenderProps = {
	isLoading?: boolean;
	children: ReactNode;
	[name: string]: unknown;
};
type LoadingProps = {
	isLoading?: boolean;
	children: ReactNode;
	renderProps?: (dataItem: RenderProps) => ReactNode;
	className?: string;
};
function Loading({ className = '-top-8 -right-8', ...props }: LoadingProps) {
	if (!props.isLoading) {
		return <Fragment>{props.children}</Fragment>;
	}
	return <Fragment>{props.renderProps?.(props) ?? <LoaderScreen className={className} />}</Fragment>;
}

export default Loading;
