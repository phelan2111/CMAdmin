import HoverCard from '@/components/root/animation/hoverCard';
import Image from '@/components/root/image/normal';
import Localize from '@/langs';
import { useState } from 'react';

type SingerItemProps = {
	name: string;
	src: string;
	onClick?: VoidFunction;
	hasInactive: boolean;
	checkedDefault?: boolean;
	disabled?: boolean;
	className?: string;
};

function SingerItem({ className = '', ...props }: SingerItemProps) {
	const [hasSelected, setHasSelected] = useState<boolean>(Boolean(props.checkedDefault));

	return (
		<div className={`relative ${props.hasInactive && 'opacity-40 pointer-events-none'} ${className}`}>
			<HoverCard
				onClick={() => {
					setHasSelected((prev) => !prev);
					props.onClick?.();
				}}
				className={`w-full rounded-full transition-all duration-300 overflow-hidden cursor-pointer ${
					hasSelected && 'bg-white/80 text-primary_dark shadow-podcastsCard'
				} `}>
				<div className='flex items-center gap-4 bg-white/10 w-full p-2 pr-8'>
					<Image className='size-24 !rounded-full object-cover' src={props.src} />
					<div className='text-sm text-inherit flex flex-col gap-1'>
						<p>{Localize('ARTIST')}</p>
						<p className='font-semibold'>{props.name}</p>
					</div>
				</div>
			</HoverCard>
		</div>
	);
}

export default SingerItem;
