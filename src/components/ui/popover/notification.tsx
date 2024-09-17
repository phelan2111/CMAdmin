import AnimationScale from '@/components/root/animation/scale';
import Popover from '@/components/root/popover/normal';
import { IoNotificationsOutline } from 'react-icons/io5';

function PopoverNotification() {
	return (
		<Popover>
			<AnimationScale className='hover:scale-110 cursor-pointer'>
				<div className='w-10 h-10 rounded-full bg-primary_dark-20 flex items-center justify-center text-white hover:bg-primary_dark-20/50'>
					<IoNotificationsOutline className='text-xl' />
				</div>
			</AnimationScale>
		</Popover>
	);
}

export default PopoverNotification;
