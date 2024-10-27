import Skeleton from '@/components/root/skeleton/normal';
import { Fragment, ReactNode } from 'react';

type SkeletonDetailsProps = {
	children: ReactNode;
	isSkeleton: boolean;
};

function SkeletonDetails(props: SkeletonDetailsProps) {
	if (!props.isSkeleton) {
		return <Fragment>{props.children}</Fragment>;
	}
	return (
		<div className='pl-8 pr-4 flex flex-col gap-10 animate-translateRight'>
			<div className='flex justify-between items-end'>
				<div className='w-full'>
					<div className='leading-10 flex flex-col gap-4'>
						<Skeleton className='h-[48px] w-80 rounded-3xl' />
						<Skeleton className='h-5 rounded-3xl w-1/2' />
					</div>
				</div>
			</div>
			<div className='bg-white/10 rounded-xl'>
				<div className=' p-6 flex flex-col gap-10 w-full'>
					<Skeleton className='h-7 w-80 rounded-3xl' />
					<div className='flex gap-6 w-full'>
						<Skeleton className='h-40 min-w-40 rounded-3xl' />
						<div className='flex flex-col gap-4 justify-between w-full'>
							<Skeleton className='h-5 w-1/2 rounded-3xl' />
							<Skeleton className='h-5 w-1/3 rounded-3xl' />
							<Skeleton className='h-5 w-1/4 rounded-3xl' />
							<Skeleton className='h-5 w-1/5 rounded-3xl' />
						</div>
					</div>
				</div>
				<div className=' p-6 flex flex-col gap-10 w-full'>
					<Skeleton className='h-7 w-80 rounded-3xl' />
					<div className='flex gap-6 w-full'>
						<Skeleton className='h-40 min-w-40 rounded-3xl' />
						<div className='flex flex-col gap-4 justify-between w-full'>
							<Skeleton className='h-5 w-1/2 rounded-3xl' />
							<Skeleton className='h-5 w-1/3 rounded-3xl' />
							<Skeleton className='h-5 w-1/4 rounded-3xl' />
							<Skeleton className='h-5 w-1/5 rounded-3xl' />
						</div>
					</div>
				</div>
			</div>
			<div className='flex justify-end gap-8'>
				<Skeleton className='h-[48px] w-80 rounded-xl' />
				<Skeleton className='h-[48px] w-80 rounded-xl' />
			</div>
		</div>
	);
}

export default SkeletonDetails;
