import { ReactNode } from 'react';
import { GoArchive } from 'react-icons/go';

interface IItemStatisticalProps {
	title: string;
	content: string;
	fromColor?: string;
	icon?: ReactNode;
}
function ItemStatistical({ fromColor = 'from-pink-500', icon = <GoArchive />, ...props }: IItemStatisticalProps) {
	return (
		<div className='bg-white/10 p-6 rounded-md flex items-center gap-8'>
			<div className={`w-20 h-20 flex justify-center items-center rounded-md bg-gradient-to-t text-2xl ${fromColor}`}>{icon}</div>
			<div className='flex flex-col justify-around h-full gap-2'>
				<p className='text-2xl font-bold'>{props.content}</p>
				<p className='text-sm'>{props.title}</p>
			</div>
		</div>
	);
}

export default ItemStatistical;
