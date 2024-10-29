import Avatar from '@/components/root/image/avatar';
import { RenderUploadProps } from '@/components/root/upload/normal';
import { MdAlternateEmail } from 'react-icons/md';

function AvatarUpload(props: RenderUploadProps) {
	console.log('props', props);
	return (
		<div className='-translate-y-1/2 px-16 flex items-end'>
			<Avatar
				className='size-52 border-4 border-white'
				src='https://res.cloudinary.com/dkvhfe4uu/image/upload/v1730121609/pexels-pixabay-164727_a3vbpu.jpg'
			/>
			<div className='pb-4 pl-8 flex flex-col gap-2'>
				<div className='flex items-end gap-1 text-4xl font-bold'>
					<p>213213</p>
					<p>123213213</p>
				</div>
				<div className='flex gap-1 text-sm'>
					<p className='flex gap-1 items-center'>
						<MdAlternateEmail />
					</p>
					<p>123213213</p>
				</div>
			</div>
		</div>
	);
}

export default AvatarUpload;
