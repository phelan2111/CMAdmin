import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Skip() {
	return (
		<div className='flex items-center gap-2 '>
			<div className='w-8 h-8 hover:scale-110 cursor-pointer transition-all duration-300 flex justify-center items-center'>
				<IoIosArrowBack />
			</div>
			<div className='w-8 h-8 flex justify-center items-center rounded-full hover:scale-110 cursor-pointer transition-all duration-300 bg-white/10'>
				<span className='text-md'>1</span>
			</div>
			<div className='w-8 h-8 flex justify-center items-center rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10'>
				<span className='text-md'>2</span>
			</div>
			<div className='w-8 h-8 flex justify-center items-center rounded-full cursor-pointer transition-all duration-300'>
				<span className='text-md'>...</span>
			</div>
			<div className='w-8 h-8 flex justify-center items-center rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10'>
				<span className='text-md'>6</span>
			</div>
			<div className='w-8 h-8 hover:scale-110 cursor-pointer transition-all duration-300 flex justify-center items-center'>
				<IoIosArrowForward />
			</div>
		</div>
	);
}

export default Skip;
