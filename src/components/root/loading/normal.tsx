import LoaderScreen from '@/components/ui/loader/screen';
import { Fragment, ReactNode } from 'react';
type RenderProps = {
	isLoading: boolean;
	children: ReactNode;
};
type LoadingProps = {
	isLoading: boolean;
	children: ReactNode;
	renderProps?: (dataItem: RenderProps) => ReactNode;
	className?: string;
};
function Loading({ className = '-top-8 -right-8', ...props }: LoadingProps) {
	return (
		<Fragment>
			{props.isLoading && (props.renderProps?.(props) ?? <LoaderScreen className={className} />)}
			{props.children}
		</Fragment>
	);
}

export default Loading;
