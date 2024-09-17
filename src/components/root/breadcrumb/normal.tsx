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
					<div
						key={`${item.id}-${index}`}
						className='flex items-center gap-2 text-white'>
						<div className='cursor-pointer hover:underline'>
							Home
						</div>
						<MdNavigateNext />
					</div>
				);
			})}
		</div>
	);
}

export default BreadcrumbNormal;
