import LogoComponent from '../common/logo';
import Menu from '@/components/root/menu/normal';
import MenuItem from '@/components/root/menu/item/normal';
import {
	GoBook,
	GoChevronDown,
	GoChevronRight,
	GoCopilot,
	GoHome,
	GoStack,
} from 'react-icons/go';

function DrawerNormal() {
	return (
		<aside className='h-full bg-white/10 backdrop-blur-2xl flex flex-col gap-4 rounded-l-2xl'>
			<div className='p-4 h-20 overflow-hidden flex items-center justify-between'>
				<div className='scale-50 -translate-y-0 -translate-x-10 cursor-pointer'>
					<LogoComponent />
				</div>
				<div className='w-7 h-7 cursor-pointer transition-all duration-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-50 hover:text-primary_dark-20'>
					<GoChevronRight />
				</div>
			</div>
			<nav className='pr-3'>
				<Menu>
					<MenuItem>
						<div className='flex items-center gap-2 text-md w-full rounded-2xl text-white bg-white/20 py-2 px-3 hover:bg-white/10 transition-colors duration-500'>
							<GoHome className='text-xl' />
							<div className='pt-1'>
								<p>Home</p>
							</div>
						</div>
					</MenuItem>
					<MenuItem>
						<div className='flex items-center justify-between gap-2 text-md w-full rounded-2xl text-white py-2 px-3 hover:bg-white/10 transition-colors duration-500'>
							<div className='flex items-center gap-2'>
								<GoStack className='text-xl' />
								<div className='pt-1'>
									<p>Music</p>
								</div>
							</div>
							<GoChevronDown />
						</div>
						<Menu gap='gap-0'>
							<MenuItem>
								<div className='flex items-center justify-between gap-2 text-md w-full rounded-2xl text-white py-2 px-3 hover:bg-white/10 transition-colors duration-500'>
									<div className='flex items-center gap-2'>
										<div className='w-2 h-2' />
										<div className='pt-1'>
											<p>Album</p>
										</div>
									</div>
								</div>
							</MenuItem>
							<MenuItem>
								<div className='flex items-center justify-between gap-2 text-md w-full rounded-2xl text-white py-2 px-3 hover:bg-white/10 transition-colors duration-500'>
									<div className='flex items-center gap-2'>
										<div className='w-2 h-2' />
										<div className='pt-1'>
											<p>Playlist</p>
										</div>
									</div>
								</div>
							</MenuItem>
						</Menu>
					</MenuItem>
					<MenuItem>
						<div className='flex items-center justify-between gap-2 text-md w-full rounded-2xl text-white py-2 px-3 hover:bg-white/10 transition-colors duration-500'>
							<div className='flex items-center gap-2'>
								<GoCopilot className='text-xl' />
								<div className='pt-1'>
									<p>Artists</p>
								</div>
							</div>
						</div>
					</MenuItem>
					<MenuItem>
						<div className='flex items-center justify-between gap-2 text-md w-full rounded-2xl text-white py-2 px-3 hover:bg-white/10 transition-colors duration-500'>
							<div className='flex items-center gap-2'>
								<GoBook className='text-xl' />
								<div className='pt-1'>
									<p>Podcast</p>
								</div>
							</div>
						</div>
					</MenuItem>
				</Menu>
			</nav>
		</aside>
	);
}

export default DrawerNormal;
