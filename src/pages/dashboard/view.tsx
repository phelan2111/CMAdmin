import Localize from '@/langs';
import VisitsChart from '@/layout/dashboard/chart/visitsOfMusic';
import PodcastChart from '@/layout/dashboard/chart/visitsOfPodcast';
import StatisticalList from '@/layout/dashboard/list/statistical';

function View() {
	return (
		<div className='pr-4 py-8'>
			<section className='pl-8 pr-4 flex flex-col gap-6 text-white h-content overflow-auto scrollHiddenY'>
				<div className='leading-10 animate-translateRight'>
					<h1 className='text-5xl font-semibold'>{Localize('DASHBOARD')}</h1>
					<p>It is a long established fact that a reader will be distra</p>
				</div>
				<div className='flex flex-col gap-4'>
					<StatisticalList />
					<div className='flex gap-6'>
						<VisitsChart />
						<PodcastChart />
					</div>
				</div>
			</section>
		</div>
	);
}

export default View;
