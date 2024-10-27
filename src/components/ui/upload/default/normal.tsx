import Localize from '@/langs';
import { CiImageOn } from 'react-icons/ci';

function DefaultUpload() {
	return (
		<div className='flex flex-col items-center justify-center w-full bg-white/50 gap-4 border-2 border-dashed border-white p-4 rounded-xl cursor-pointer'>
			<CiImageOn className='text-7xl' />
			<p className='text-sm font-semibold'>
				{Localize('FILE_UPLOAD')} <span>{Localize('BROWSE')}</span>
			</p>
			<p className='text-sm text-gray-500 font-semibold'>{Localize('MAX_FILE_SIZE')}</p>
		</div>
	);
}

export default DefaultUpload;
