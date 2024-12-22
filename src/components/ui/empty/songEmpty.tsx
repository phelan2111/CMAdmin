import { Fragment, ReactNode } from 'react';
import EmptyComponent from '../common/empty';
import Localize from '@/langs';

type EmptySongProps = { totalColumn: number; children: ReactNode };

function EmptySong(props: EmptySongProps) {
	if (props.totalColumn > 0) {
		return <Fragment>{props.children}</Fragment>;
	}
	return (
		<div>
			<div className=' p-4 flex flex-col justify-center items-center gap-6 rounded-md'>
				<EmptyComponent />
				<p className='animate-translateRight'>{Localize('EMPTY_SONG')}</p>
			</div>
		</div>
	);
}

export default EmptySong;
