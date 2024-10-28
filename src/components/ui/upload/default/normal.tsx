import { RenderUploadProps } from '@/components/root/upload/normal';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { CiImageOn } from 'react-icons/ci';

function DefaultUpload(props: RenderUploadProps) {
	return (
		<div>
			<div className='flex flex-col items-center justify-center w-full bg-white/50 gap-4 border-2 border-dashed border-white p-4 rounded-xl cursor-pointer'>
				<CiImageOn className='text-7xl' />
				<p className='text-sm font-semibold'>
					{Localize('FILE_UPLOAD')} <span>{Localize('BROWSE')}</span>
				</p>
				<p className='text-sm text-gray-500 font-semibold'>{Localize('MAX_FILE_SIZE')}</p>
			</div>
			{!Helper.isEmpty(props.messageError) && (
				<p className={`text-xs px-2 py-0.5 rounded-3xl italic text-end absolute bottom-0 right-0 translate-y-full text-red-600 font-medium`}>
					{props.messageError?.toString()}
				</p>
			)}
		</div>
	);
}

export default DefaultUpload;
