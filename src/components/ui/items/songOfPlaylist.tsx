import { ResponseGetListArtist } from '@/services/music/artist/getSinger';
import { Helper } from '@/utils/helper';
import { useMemo } from 'react';

type ItemSongOfPlaylistProps = {
	img: string;
	name: string;
	artist: ResponseGetListArtist[];
};

const ItemSongOfPlaylist = (props: ItemSongOfPlaylistProps) => {
	const artist = useMemo(() => {
		return props.artist.map((s) => s.singerName);
	}, [props.artist]);

	return (
		<div className='flex justify-between group items-center hover:bg-primary_light/10 p-3 rounded-xl transition-all duration-500 cursor-pointer'>
			<div className='flex gap-4 snap-start items-center'>
				<div>1</div>
				<img className='min-w-12 max-w-12 h-12 object-cover rounded-lg' src={props.img} alt={props.img} />
				<div className='flex items-center justify-between w-full'>
					<div>
						<h6>{props.name}</h6>
						<p className='text-xs truncate w-52'>{artist.join(', ')}</p>
					</div>
				</div>
			</div>
			<p>{Helper.formatNumber(19213123123)}</p>
			<p>2:17</p>
		</div>
	);
};

export default ItemSongOfPlaylist;
