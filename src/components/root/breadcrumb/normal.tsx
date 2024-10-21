import { ReactNode } from 'react';
import { MdNavigateNext } from 'react-icons/md';

export interface IItemBreadcrumb {
	text?: string;
	path?: string;
	id: string;
	renderTextProps?: (dataItem: IItemBreadcrumb) => ReactNode;
	disabled?: boolean;
}
interface IBreadcrumbNormalProps {
	data: IItemBreadcrumb[];
}
function BreadcrumbNormal(props: IBreadcrumbNormalProps) {
	return (
		<div>
			{props.data.map((item, index) => {
				return (
					<div key={`${item.id}-${index}`} className='flex items-center gap-2 text-white'>
						<div className='cursor-pointer group py-1 relative overflow-hidden'>
							Home
							<div className='h-1 bg-gradient-to-l absolute right-0 -translate-x-full group-hover:translate-x-0 -bottom-0 w-full transition-all duration-500 from-indigo-500 rounded-xl' />
						</div>
						<MdNavigateNext />
					</div>
				);
			})}
		</div>
	);
}

export default BreadcrumbNormal;
