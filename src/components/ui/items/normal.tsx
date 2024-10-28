import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { ReactNode } from 'react';

type ItemProps = {
	label: string;
	content?: string;
	renderContent?: () => ReactNode;
	classLabel?: string;
};

function Item({ classLabel = 'min-w-60', ...props }: ItemProps) {
	return (
		<div className='flex items-center gap-6'>
			<p className={classLabel}>{Localize(props.label)}</p>
			{props.renderContent?.() ?? <p className='font-semibold'>{Helper.isEmpty(props.content) ? '-' : props.content}</p>}
		</div>
	);
}

export default Item;
