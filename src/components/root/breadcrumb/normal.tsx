import { useRedirect } from '@/hooks/useRedirect';
import { ReactNode } from 'react';
import { MdNavigateNext } from 'react-icons/md';

export interface IItemBreadcrumb {
	text?: string;
	path?: string;
	id: string;
	renderTextProps?: (dataItem: IItemBreadcrumb) => ReactNode;
	disabled?: boolean;
	hasPrev?: boolean;
}
interface IBreadcrumbNormalProps {
	data: IItemBreadcrumb[];
}
function BreadcrumbNormal(props: IBreadcrumbNormalProps) {
	const { redirectPage, redirectPrev } = useRedirect();

	return (
		<div className='flex'>
			{props.data.map((item, index) => {
				return (
					<div
						key={`${item.id}-${index}`}
						aria-hidden
						onClick={() => {
							if (item.hasPrev) {
								redirectPrev();
							} else {
								if (item.path) redirectPage(item.path);
							}
						}}
						className={`flex group items-center gap-2 text-white cursor-pointer ${item.disabled ? 'opacity-60' : 'opacity-100'}`}>
						<div className='group py-1 relative overflow-hidden'>
							{item.text}
							<div className='h-1 bg-gradient-to-l absolute right-0 -translate-x-full group-hover:translate-x-0 -bottom-0 w-full transition-all duration-500 from-indigo-500 rounded-xl' />
						</div>
						<MdNavigateNext className='group-last-of-type:hidden' />
					</div>
				);
			})}
		</div>
	);
}

export default BreadcrumbNormal;
