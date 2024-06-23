import MenuIcon, { IItemIcon } from '@/components/menu/icon';
import PopperBottom from '@/core/popper';
import Video from '@/core/video/video';
import {
	BsBroadcast,
	BsChevronCompactLeft,
	BsCloudDownloadFill,
	BsFillFileCodeFill,
	BsFillPlusCircleFill,
	BsFillXOctagonFill,
	BsShareFill,
} from 'react-icons/bs';
import { FaPlayCircle, FaUserAstronaut } from 'react-icons/fa';
import { LiaRandomSolid } from 'react-icons/lia';
import SongOfAlbum from './components/list/song';
import { GoDownload, GoKebabHorizontal, GoPlus } from 'react-icons/go';
import IconBootstrapLarge from '@/components/icon/iconBootstrapLarge';
import data from './data/songs.json';

interface IAlbumMobileProps {
	onRedirectHome: VoidFunction;
}

function AlbumMobile(props: IAlbumMobileProps) {
	const itemsMenu: IItemIcon[] = [
		{
			icon: <BsFillPlusCircleFill />,
			text: 'ADD_TO_YOUR_LIBRARY',
			onClick: () => {},
		},
		{
			icon: <BsCloudDownloadFill />,
			text: 'DOWNLOAD',
			onClick: () => {},
		},
		{
			icon: <BsFillXOctagonFill />,
			text: 'NOT_INTERESTED',
			onClick: () => {},
		},
		{
			icon: <BsFillPlusCircleFill />,
			text: 'ADD_TO_PLAYLIST',
			onClick: () => {},
		},
		{
			icon: <FaUserAstronaut />,
			text: 'VIEW_ARTISTS',
			onClick: () => {},
		},
		{
			icon: <BsShareFill />,
			text: 'SHARE',
			onClick: () => {},
		},
		{
			icon: <BsBroadcast />,
			text: 'GO_TO_ALBUM_RADIO',
			onClick: () => {},
		},
		{
			icon: <BsFillFileCodeFill />,
			text: 'SHOW_CODE',
			onClick: () => {},
		},
	];

	return (
		<div className='w-full p-4 flex flex-col gap-4  overflow-y-auto h-album'>
			<div className='relative w-full flex justify-center items-center'>
				<div className='shadow-bootstrapLarge relative rounded-xl flex flex-col gap-2 p-1'>
					<div className='bg-primary_dark relative z-10 p-4 rounded-xl'>
						<img
							className='h-52 w-52 rounded-xl relative z-10'
							src='https://i.pinimg.com/564x/e8/5e/bf/e85ebf981f08428d11b1cbd54e44357b.jpg'
							alt='https://i.pinimg.com/564x/e8/5e/bf/e85ebf981f08428d11b1cbd54e44357b.jpg'
						/>
						<div className='pt-2'>
							<p className='font-semibold'>{data.name}</p>
							<p className='text-[10px]'>
								{data.singers.join('')}
							</p>
						</div>
					</div>
				</div>
				<div
					aria-hidden
					onClick={props.onRedirectHome}
					className='absolute top-0 left-0 shadow-bootstrapLarge p-2 rounded-full'>
					<BsChevronCompactLeft />
				</div>
			</div>
			<div className='flex flex-col gap-2 '>
				<p className='text-sm'>2h 33min</p>
				<article className='flex justify-between items-center'>
					<div className='flex gap-8 items-center'>
						<div className='w-12 h-12 shadow-bootstrapLarge rounded-md overflow-auto'>
							<Video
								mute={true}
								autoPlay
								src='https://res.cloudinary.com/dkvhfe4uu/video/upload/v1718469569/justFriend_oximsk.mp4'
								track='https://res.cloudinary.com/dkvhfe4uu/video/upload/v1718469569/justFriend_oximsk.mp4'
							/>
						</div>
						<IconBootstrapLarge>
							<GoPlus className='text-md hover:scale-110 transition-transform duration-300 cursor-pointer' />
						</IconBootstrapLarge>
						<IconBootstrapLarge>
							<GoDownload className='text-md hover:scale-110 transition-transform duration-300 cursor-pointer' />
						</IconBootstrapLarge>
						<PopperBottom
							render={(renderProps) => {
								return (
									<MenuIcon
										onClose={renderProps.onClose}
										items={itemsMenu}
									/>
								);
							}}>
							<IconBootstrapLarge>
								<GoKebabHorizontal className='text-lg rotate-90' />
							</IconBootstrapLarge>
						</PopperBottom>
					</div>
					<div className='flex gap-3 items-center'>
						<IconBootstrapLarge>
							<LiaRandomSolid className='text-lg hover:scale-110 transition-transform duration-300 cursor-pointer' />
						</IconBootstrapLarge>
						<FaPlayCircle className='text-5xl hover:scale-110 transition-transform duration-300 cursor-pointer shadow-bootstrapLarge rounded-full' />
					</div>
				</article>
			</div>
			<SongOfAlbum data={data.songs} />
		</div>
	);
}

export default AlbumMobile;
