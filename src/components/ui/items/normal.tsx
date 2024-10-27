import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { ReactNode } from 'react';

type ItemProps = {
	label: string;
	content?: string;
	renderContent?: () => ReactNode;
};

function Item(props: ItemProps) {
	return (
		<div className='flex items-center gap-6'>
			<p className='min-w-60'>{Localize(props.label)}</p>
			{props.renderContent?.() ?? <p className='font-semibold'>{Helper.isEmpty(props.content) ? '-' : props.content}</p>}
		</div>
	);
}

export default Item;
