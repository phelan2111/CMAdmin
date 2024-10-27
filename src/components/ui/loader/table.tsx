import Localize from '@/langs';
import EmptyComponent from '../common/empty';
import Skeleton from '@/components/root/skeleton/normal';

function LoaderTable() {
	return (
		<div>
			<div className='h-12 items-center gap-4 grid grid-cols-8'>
				{Array.from({ length: 8 }).map((_, index) => {
					return <Skeleton key={`${_}_${LoaderTable.name}_${index}`} className='w-full h-10 rounded-xl' />;
				})}
			</div>
			<div
				style={{
					height: 'calc(100dvh - 535px)',
				}}
				className='w-full flex flex-col gap-6 items-center justify-center'>
				<EmptyComponent />
				<p className='uppercase animate-translateRight'>{Localize('LOADING')}</p>
			</div>
		</div>
	);
}

export default LoaderTable;
