import Avatar from '@/components/root/image/avatar';
import MenuItem from '@/components/root/menu/item/normal';
import Menu from '@/components/root/menu/normal';
import Popover from '@/components/root/popover/normal';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { SlUser } from 'react-icons/sl';

function PopoverProfile() {
	return (
		<Popover
			className=''
			renderContent={({ onClose }) => {
				return (
					<Menu className='duration-500 transition-all rounded-md overflow-hidden' gap='gap-0'>
						<MenuItem
							className={`px-3 py-2 bg-white hover:bg-gray-200 w-36 flex gap-2 items-center`}
							onClick={() => {
								onClose();
							}}>
							<SlUser className='text-base' />
							<p className='text-sm'>Profile</p>
						</MenuItem>
						<MenuItem
							className={`px-3 py-2 bg-white hover:bg-gray-200 w-36 flex gap-2 items-center`}
							onClick={() => {
								onClose();
							}}>
							<IoSettingsOutline className='text-base' />
							<p className='text-sm'>Setting</p>
						</MenuItem>
						<MenuItem
							className={`px-3 py-2 bg-white hover:bg-gray-200 w-36 flex gap-2 items-center`}
							onClick={() => {
								onClose();
							}}>
							<RiLogoutCircleRLine className='text-base' />
							<p className='text-sm'>Logout</p>
						</MenuItem>
					</Menu>
				);
			}}>
			<div className='flex min-w-36 transition-all duration-300 items-center gap-3 bg-white/10 rounded-full py-2 pl-2 pr-4 cursor-pointer hover:bg-white/30'>
				<Avatar className='size-8' src='https://i.pinimg.com/736x/84/26/0f/84260f8e41c4d404df1a401ad73afd58.jpg' />
				<p className='text-white whitespace-nowrap'>Phelan Ly</p>
			</div>
		</Popover>
	);
}

export default PopoverProfile;
