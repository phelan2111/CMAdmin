import { PagingState } from '@/components/root/grid/types';
import { Fragment, useMemo } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type SkipProps = {
	onChange: (skip: number) => void;
	paging: PagingState;
	totalRecord: number;
};

function CreateArrayInitial(quantity: number): number[] {
	return [...Array.from({ length: quantity })].map((_, i) => i);
}

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
	const numberOfPagesArray = useMemo(() => {
		return CreateArrayInitial(totalPage);
	}, [totalPage]);

	const handlePrev = () => {
		props.onChange(props.paging.skip - 1);
	};
	const handleNext = () => {
		props.onChange(props.paging.skip + 1);
	};

	const handleRender = (isActive: boolean, item: number) => {
		const isNearActive = item === props.paging.skip + 1 || item === props.paging.skip - 1;
		const isDot = item === props.paging.skip + (props.paging.skip === 0 ? 3 : 2) || item === props.paging.skip - 2;
		const isInitial = item < 3 && props.paging.skip === 0;
		const isFirstOrLastElement = item === 0 || item === numberOfPagesArray.length - 1;
		const isElementActive = item === props.paging.skip;

		if (isFirstOrLastElement || isInitial || isElementActive || isNearActive) {
			return (
				<div
					aria-hidden
					onClick={() => {
						props.onChange(item);
					}}
					key={`_${item}_skip`}
					className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer transition-all duration-300 ${
						isActive ? 'bg-white/10' : 'bg-transparent group'
					} `}>
					<span className='text-md group-hover:underline'>{item + 1}</span>
				</div>
			);
		}
		if (isDot) {
			return <>...</>;
		}
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
			{numberOfPagesArray.map((i, index) => {
				const isActive = props.paging.skip === index;

				return <Fragment key={`${index}-${i}-${Skip.name}`}>{handleRender(isActive, i)}</Fragment>;
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
