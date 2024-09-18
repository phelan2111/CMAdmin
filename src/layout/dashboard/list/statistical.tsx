import HoverCard from '@/components/root/animation/hoverCard';
import ItemStatistical from '@/components/ui/items/statistical';
import { GoBook, GoCopilot, GoHubot, GoStack } from 'react-icons/go';

function StatisticalList() {
	return (
		<div className='grid grid-cols-4 gap-6'>
			<HoverCard className='rounded-xl overflow-hidden cursor-pointer animate-translateRight'>
				<ItemStatistical icon={<GoHubot />} title='Total users' content='36789 user' />
			</HoverCard>
			<HoverCard className='rounded-xl overflow-hidden cursor-pointer animate-translateRight'>
				<ItemStatistical icon={<GoStack />} fromColor='from-[#55679C]' title='Total musics' content='5269 songs' />
			</HoverCard>
			<HoverCard className='rounded-xl overflow-hidden cursor-pointer animate-translateRight'>
				<ItemStatistical icon={<GoCopilot />} title='Total artists' content='1000 artists' />
			</HoverCard>
			<HoverCard className='rounded-xl overflow-hidden cursor-pointer animate-translateRight'>
				<ItemStatistical icon={<GoBook />} fromColor='from-[#55679C]' title='Total podcasts' content='89 podcasts' />
			</HoverCard>
		</div>
	);
}

export default StatisticalList;
