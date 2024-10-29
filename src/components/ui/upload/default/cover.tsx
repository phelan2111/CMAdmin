import CoverImage from '@/components/root/image/cover';
import { RenderUploadProps } from '@/components/root/upload/normal';

function CoverUpload(props: RenderUploadProps) {
	console.log('props', props);
	return (
		<CoverImage
			className='border-2 border-white w-full h-72'
			src='https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
		/>
	);
}

export default CoverUpload;
