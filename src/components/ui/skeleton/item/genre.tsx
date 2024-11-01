import { Fragment } from 'react/jsx-runtime';
import { SkeletonProps } from '../types';
import Skeleton from '@/components/root/skeleton/normal';
import { Helper } from '@/utils/helper';

function SkeletonGenreItem(props: SkeletonProps) {
	if (!props.isSkeleton) {
		return <Fragment>{props.children}</Fragment>;
	}
	return (
		<Fragment>
			{Array.from({ length: 6 }).map(() => {
				return (
					<div key={Helper.randomKey()} className='flex flex-col justify-center items-center gap-2 bg-white/10 w-full rounded-lg p-2'>
						<Skeleton className='w-32 h-28 rounded-lg' />
						<Skeleton className='w-32 h-5 rounded-lg' />
					</div>
				);
			})}
		</Fragment>
	);
}

export default SkeletonGenreItem;
