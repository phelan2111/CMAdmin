/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from '@/components/root/image/avatar';
import { DataUpload } from '@/components/root/upload/normal';
import { Helper } from '@/utils/helper';
import { ChangeEvent, useEffect, useState } from 'react';
import { ResponseUpload } from '@/services/types';
import BallLoader from '@/components/ui/loader/ball';
import { useFormContext } from 'react-hook-form';
import ServiceUploadSong from '@/services/music/song/upload';
import { UploadAvatarProps } from '../../types';

function UploadRequest({
	name = '',
	src = 'http://res.cloudinary.com/dkvhfe4uu/image/upload/v1730217712/user/image/pexels-pixabay-161154_sclyji.jpg',
	className = 'size-52 border-4 border-white ',
	multi = false,
}: UploadAvatarProps) {
	const form = useFormContext();

	const [uploadData, setUploadData] = useState<DataUpload>({
		src,
		uploadId: Helper.randomKey(),
	});
	const { isLoadingUploadSongService, onUploadSong } = ServiceUploadSong({
		onSuccess: (res) => {
			const dataItem = res as ResponseUpload;
			const value: DataUpload = {
				src: dataItem.link,
				uploadId: Helper.randomKey(),
			};
			setUploadData(value);
		},
	});

	const handleOnChange = (dataItem: ChangeEvent<HTMLInputElement>) => {
		const fileList = dataItem.currentTarget.files;

		if (fileList) {
			const files = Object.values(fileList);
			const formData = new FormData();
			formData.append('file', files[0]);
			onUploadSong(formData);
		}
	};

	useEffect(() => {
		if (name) {
			form?.setValue(name, uploadData, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
		}
	}, [name, uploadData]);

	return (
		<div className='flex items-end relative z-10'>
			<div className='relative'>
				{isLoadingUploadSongService && (
					<div className='absolute top-0 left-0 w-full h-full bg-primary_dark/80 rounded-full flex items-center justify-center z-20'>
						<BallLoader />
					</div>
				)}
				<Avatar className={`relative ${className}`} src={uploadData.src} />
				<input multiple={multi} onChange={handleOnChange} className='w-full h-full absolute top-0 opacity-0' name='avatar' id='avatar' type='file' />
			</div>
		</div>
	);
}

export default UploadRequest;
