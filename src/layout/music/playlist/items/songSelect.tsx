import Checkbox from '@/components/root/inputs/checkbox';
import ItemSong from '@/components/ui/items/song';
import { ResponseGetListSong } from '@/services/music/song/getSong';
import { useMemo } from 'react';

type ItemSongSelectProps = {
	song: ResponseGetListSong;
	onChange: (dataItem: ResponseGetListSong) => void;
};
const ItemSongSelect = (props: ItemSongSelectProps) => {
	const artist = useMemo(() => {
		return props.song.singers.map((s) => s.singerName);
	}, [props.song]);

	return (
		<div className='flex snap-start items-center gap-3 hover:bg-white/10 cursor-pointer px-3 py-2 transition-colors duration-300 border-b last-of-type:border-transparent'>
			<Checkbox
				onChange={() => {
					props.onChange(props.song);
				}}
			/>
			<ItemSong typeSong={props.song.type} artist={artist} image={props.song.image} name={props.song.songName} />
		</div>
	);
};

export default ItemSongSelect;
