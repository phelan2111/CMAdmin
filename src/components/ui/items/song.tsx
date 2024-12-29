import Avatar from '@/components/root/image/avatar';
import Localize from '@/langs';
import { TypeFileSetUpSong } from '@/utils/enums';
import { useMemo } from 'react';
import { MdPersonalVideo } from 'react-icons/md';

type ItemSongProps = {
	name: string;
	artist: string[];
	image: string;
	typeSong: TypeFileSetUpSong;
};

const ItemSong = ({ artist = [''], image = '', name = '', ...props }: ItemSongProps) => {
	const hasVideo = useMemo(() => {
		return props.typeSong === TypeFileSetUpSong.video;
	}, [props]);

	return (
		<div className='flex items-center gap-2'>
			<Avatar className='rounded-lg size-10' src={image} />
			<div className='flex flex-col gap-1'>
				<p className='font-medium'>{name}</p>
				<div className='text-xs flex items-centers gap-1'>
					{hasVideo && (
						<div className='flex gap-2'>
							<MdPersonalVideo className='text-sm' /> <p>{Localize('MUSIC_VIDEO')} •</p>
						</div>
					)}
					<p>{artist.join(', ')}</p>
				</div>
			</div>
		</div>
	);
};

export default ItemSong;
