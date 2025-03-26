import { Fragment, ReactNode } from 'react';
import EmptyComponent from '../common/empty';
import Localize from '@/langs';

type EmptySongOfPlaylistProps = { totalColumn: number; children: ReactNode };

function EmptySongOfPlaylist(props: EmptySongOfPlaylistProps) {
	if (props?.totalColumn > 0) {
		return <Fragment>{props.children}</Fragment>;
	}
	return (
		<div>
			<div className=' p-4 flex flex-col justify-center items-center gap-6 rounded-md'>
				<EmptyComponent />
				<p className='animate-translateRight'>{Localize('EMPTY_SONG_OF_PLAYLIST')}</p>
			</div>
		</div>
	);
}

export default EmptySongOfPlaylist;
