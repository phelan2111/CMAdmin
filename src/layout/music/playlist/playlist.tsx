import SearchTool from '@/components/ui/common/tool/search/normal';
import EmptySong from '@/components/ui/empty/songEmpty';
import EmptySongOfPlaylist from '@/components/ui/empty/songOfPlaylist';
import ItemSongOfPlaylist from '@/components/ui/items/songOfPlaylist';
import Localize from '@/langs';
import ItemSongSelect from './items/songSelect';

const Playlist = () => {
	return (
		<div className='flex h-full'>
			<div className='w-2/3 p-6 bg-white/10 rounded-es-xl'>
				<p className='text-2xl font-medium'>{Localize('SONGS_OF_PLAYLIST')}</p>
				<EmptySongOfPlaylist totalColumn={0}>
					<ItemSongOfPlaylist img='https://i.pinimg.com/736x/0b/45/52/0b4552e57f15123b4539ba5f21e80bdf.jpg' />
				</EmptySongOfPlaylist>
			</div>
			<div className='w-1/3 bg-primary_dark-10 p-6 flex flex-col gap-4 rounded-ee-xl select-none'>
				<p className='text-2xl font-medium'>{Localize('LIST_SONG')}</p>
				<SearchTool className='w-full' label='' placeholder='Search name or songId' />
				<div className='pt-6'>
					<EmptySong totalColumn={1}>
						<ItemSongSelect />
					</EmptySong>
				</div>
			</div>
		</div>
	);
};

export default Playlist;
