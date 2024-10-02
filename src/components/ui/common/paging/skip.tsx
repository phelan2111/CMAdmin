import { PagingState } from '@/components/root/grid/types';
import { useMemo } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type SkipProps = {
	onChange: (skip: number) => void;
	paging: PagingState;
	totalRecord: number;
};
function Skip(props: SkipProps) {
	const totalPage = useMemo(() => {
		const avgPage = Math.ceil(props.totalRecord / props.paging.take);

		return avgPage;
	}, [props.totalRecord, props.paging]);
	const isFirstPage = useMemo(() => {
		return props.paging.skip === 0;
	}, [props.paging]);
	const isLastPage = useMemo(() => {
		return props.paging.skip === totalPage - 1;
	}, [props.paging, totalPage]);

	const handlePrev = () => {
		props.onChange(props.paging.take - 1);
	};
	const handleNext = () => {
		props.onChange(props.paging.take + 1);
	};

	return (
		<div className='flex items-center gap-2 '>
			<div
				aria-hidden
				onClick={handlePrev}
				className={`w-8 h-8 hover:scale-110 cursor-pointer transition-all duration-300 flex justify-center items-center ${
					isFirstPage ? 'opacity-50 pointer-events-none' : 'opacity-100'
				}`}>
				<IoIosArrowBack />
			</div>
			{Array.from({ length: totalPage })
				.fill('_')
				.map((i, index) => {
					const isActive = props.paging.skip === index;

					return (
						<div
							aria-hidden
							onClick={() => {
								props.onChange(index);
							}}
							key={`${i}_${index}_skip`}
							className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer transition-all duration-300 ${
								isActive ? 'bg-white/10' : 'bg-transparent group'
							} `}>
							<span className='text-md group-hover:underline'>{index + 1}</span>
						</div>
					);
				})}
			<div
				aria-hidden
				onClick={handleNext}
				className={`w-8 h-8 hover:scale-110 cursor-pointer transition-all duration-300 flex justify-center items-center ${
					isLastPage ? 'opacity-50 pointer-events-none' : 'opacity-100'
				}`}>
				<IoIosArrowForward />
			</div>
		</div>
	);
}

export default Skip;
