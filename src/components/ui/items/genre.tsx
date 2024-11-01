import HoverCard from '@/components/root/animation/hoverCard';
import Image from '@/components/root/image/normal';
import { useState } from 'react';

type GenreItemProps = {
	name: string;
	src: string;
	onClick?: VoidFunction;
	hasInactive: boolean;
	checkedDefault?: boolean;
};

function GenreItem(props: GenreItemProps) {
	const [hasSelected, setHasSelected] = useState<boolean>(Boolean(props.checkedDefault));

	return (
		<div className={`relative ${props.hasInactive && 'opacity-40 pointer-events-none'}`}>
			<HoverCard
				onClick={() => {
					setHasSelected((prev) => !prev);
					props.onClick?.();
				}}
				className={`w-fit rounded-xl transition-all duration-300 overflow-hidden cursor-pointer ${
					hasSelected && 'bg-white text-primary_dark shadow-podcastsCard'
				} `}>
				<div className='flex flex-col gap-2 bg-white/10 w-full p-2'>
					<Image className='w-32 h-28 object-cover' src={props.src} />
					<div className='text-sm text-inherit'>
						<p className='font-semibold'>{props.name}</p>
					</div>
				</div>
			</HoverCard>
			<div></div>
		</div>
	);
}

export default GenreItem;
