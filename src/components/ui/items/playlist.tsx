import HoverCard from '@/components/root/animation/hoverCard';
import Image from '@/components/root/image/normal';

function PlaylistItem() {
	return (
		<HoverCard className='w-full rounded-xl overflow-hidden cursor-pointer'>
			<div className='flex flex-col gap-2 bg-white/10 w-full p-2'>
				<Image
					className='w-32 h-28 object-cover'
					src='https://res.cloudinary.com/dkvhfe4uu/image/upload/v1730121609/pexels-pixabay-164727_a3vbpu.jpg'
				/>
				<div className='text-sm'>
					<p className='font-semibold'>My playlist #1</p>
					<p className='text-xs'>By Ly Minh Tan</p>
				</div>
			</div>
		</HoverCard>
	);
}

export default PlaylistItem;
