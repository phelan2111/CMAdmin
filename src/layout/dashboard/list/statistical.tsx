import HoverCard from '@/components/root/animation/hoverCard';
import ItemStatistical from '@/components/ui/items/statistical';
import { useRedirect } from '@/hooks/useRedirect';
import Localize from '@/langs';
import { PATH } from '@/routes/config';
import { Summary } from '@/services/other/summary';
import { FaMagento } from 'react-icons/fa';
import { GoBook, GoCopilot, GoHubot, GoStack } from 'react-icons/go';
import { MdOutlineTopic } from 'react-icons/md';

type StatisticalListProps = {
	summary: Summary;
};

function StatisticalList(props: StatisticalListProps) {
	const { redirectPage } = useRedirect();

	return (
		<div className='grid grid-cols-3 gap-6 animate-translateRight'>
			<HoverCard onClick={() => redirectPage(PATH.BROWSE.TOPIC._)} className='rounded-xl overflow-hidden cursor-pointer '>
				<ItemStatistical
					icon={<MdOutlineTopic />}
					fromColor='from-[#55679C]'
					title={`${props.summary?.topic.display} ${Localize('DISPLAY')}, ${props.summary?.topic.hidden} ${Localize('HIDDEN')}`}
					content={`${props.summary?.topic.all} ${Localize('TOPIC')}`}
				/>
			</HoverCard>
			<HoverCard onClick={() => redirectPage(PATH.BROWSE.GENRE._)} className='rounded-xl overflow-hidden cursor-pointer '>
				<ItemStatistical
					icon={<FaMagento />}
					fromColor='from-[#55679C]'
					title={`${props.summary?.genre.display} ${Localize('DISPLAY')}, ${props.summary?.genre.hidden} ${Localize('HIDDEN')}`}
					content={`${props.summary?.genre.all} ${Localize('GENRE')}`}
				/>
			</HoverCard>
			<HoverCard onClick={() => redirectPage(PATH.ACCOUNT._)} className='rounded-xl overflow-hidden cursor-pointer '>
				<ItemStatistical
					icon={<GoHubot />}
					fromColor='from-[#55679C]'
					title={`${props.summary?.user?.active} ${Localize('ACTIVE')}, ${props.summary?.user?.inActive} ${Localize('INACTIVE')}, ${
						props?.summary?.user?.lock
					} ${Localize('LOCK')}`}
					content={`${props.summary?.user.all} ${Localize('USERS')}`}
				/>
			</HoverCard>
			<HoverCard onClick={() => redirectPage(PATH.MUSIC.SONG._)} className='rounded-xl overflow-hidden cursor-pointer'>
				<ItemStatistical
					icon={<GoStack />}
					title={`${props.summary?.song.display} ${Localize('DISPLAY')}, ${props.summary?.song.hidden} ${Localize('HIDDEN')}`}
					content={`${props.summary?.song.all} ${Localize('SONGS')}`}
				/>
			</HoverCard>
			<HoverCard onClick={() => redirectPage(PATH.MUSIC.ARTIST._)} className='rounded-xl overflow-hidden cursor-pointer'>
				<ItemStatistical
					icon={<GoCopilot />}
					title={`${props.summary?.singer?.active} ${Localize('ACTIVE')}, ${props.summary?.singer?.inActive} ${Localize('INACTIVE')}, ${
						props?.summary?.singer?.lock
					} ${Localize('LOCK')}`}
					content={`${props.summary?.singer.all} ${Localize('ARTIST')}`}
				/>
			</HoverCard>
			<HoverCard className='rounded-xl overflow-hidden cursor-pointer'>
				<ItemStatistical icon={<GoBook />} title={`0 display, 0 hidden`} content={`0 ${Localize('PODCAST')}`} />
			</HoverCard>
		</div>
	);
}

export default StatisticalList;
