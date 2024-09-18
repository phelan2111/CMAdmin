import Avatar from '@/components/root/image/avatar';
import Popover from '@/components/root/popover/normal';

function PopoverProfile() {
	return (
		<Popover>
			<div className='flex transition-all duration-300 items-center gap-3 bg-white/10 rounded-full py-2 pl-2 pr-4 cursor-pointer hover:bg-white/30'>
				<Avatar className='w-8 h-8' src='https://i.pinimg.com/736x/84/26/0f/84260f8e41c4d404df1a401ad73afd58.jpg' />
				<p className='text-white'>Phelan Ly</p>
			</div>
		</Popover>
	);
}

export default PopoverProfile;
