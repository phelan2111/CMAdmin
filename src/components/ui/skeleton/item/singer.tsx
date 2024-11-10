import { Fragment } from 'react/jsx-runtime';
import { SkeletonProps } from '../types';
import Skeleton from '@/components/root/skeleton/normal';
import { Helper } from '@/utils/helper';

function SkeletonSingerItem(props: SkeletonProps) {
	if (!props.isSkeleton) {
		return <Fragment>{props.children}</Fragment>;
	}
	return (
		<Fragment>
			{Array.from({ length: 6 }).map(() => {
				return (
					<div key={Helper.randomKey()} className='flex items-center gap-6 bg-white/10 w-full rounded-full p-2'>
						<Skeleton className='size-24 rounded-full' />
						<div className='flex flex-col gap-2'>
							<Skeleton className='w-32 h-5 rounded-lg' />
							<Skeleton className='w-32 h-5 rounded-lg' />
						</div>
					</div>
				);
			})}
		</Fragment>
	);
}

export default SkeletonSingerItem;
