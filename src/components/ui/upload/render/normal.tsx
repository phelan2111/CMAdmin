import Image from '@/components/root/image/normal';
import { RenderUploadProps } from '@/components/root/upload/normal';
import CloseButton from '../../button/close';

function RenderUpload(props: RenderUploadProps) {
	return (
		<div className='flex gap-3'>
			{props.data.map((item) => {
				return (
					<div key={item.uploadId} className='relative w-fit'>
						<div className='absolute top-2 right-2'>
							<CloseButton
								onClick={() => {
									props.onDelete(item);
								}}
							/>
						</div>
						<Image src={item.src} alt='imageUpload' />
					</div>
				);
			})}
		</div>
	);
}

export default RenderUpload;
