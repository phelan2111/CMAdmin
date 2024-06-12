import AlbumCard from '@/components/card/album';
import Localize from '@/langs';
import data from '../../data/yourTopMixes.json';

function YourTopMixes() {
	return (
		<section className='flex flex-col gap-3'>
			<h4 className='text-xl font-bold'>{Localize('YOUR_TOP_MIX')}</h4>
			<div className='flex flex-nowrap gap-2 overflow-x-auto scrollHiddenX'>
				{data.map((album) => (
					<AlbumCard
						{...album}
						key={YourTopMixes.name + album.albumImage}
					/>
				))}
			</div>
		</section>
	);
}

export default YourTopMixes;