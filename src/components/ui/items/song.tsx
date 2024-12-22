import Avatar from '@/components/root/image/avatar';
import Localize from '@/langs';
import { MdPersonalVideo } from 'react-icons/md';

const ItemSong = () => {
	return (
		<div className='flex items-center gap-2'>
			<Avatar className='rounded-lg size-10' src='https://i.pinimg.com/736x/20/c1/1f/20c11f3bbb1725623ed7add957c23363.jpg' />
			<div className='flex flex-col gap-1'>
				<p className='font-medium'>Santa Tell Me</p>
				<div className='text-xs flex items-centers gap-2'>
					<MdPersonalVideo className='text-sm' /> <p>{Localize('MUSIC_VIDEO')}</p>
					<p>• Ariana Grade</p>
				</div>
			</div>
		</div>
	);
};

export default ItemSong;
