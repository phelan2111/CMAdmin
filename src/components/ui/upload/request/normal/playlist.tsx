/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from '@/components/root/image/avatar';
import { DataUpload } from '@/components/root/upload/normal';
import { Helper } from '@/utils/helper';
import { ChangeEvent, useEffect, useState } from 'react';
import { ResponseUpload } from '@/services/types';
import BallLoader from '@/components/ui/loader/ball';
import { useFormContext } from 'react-hook-form';
import { UploadAvatarProps } from '../../types';
import ServiceUploadCoverImagePlaylist from '@/services/music/playlist/upload';
import { MdOutlineFileUpload } from 'react-icons/md';
import Localize from '@/langs';

function UploadRequest({
	name = '',
	src = 'https://res.cloudinary.com/dkvhfe4uu/image/upload/v1748598392/singer/image/avatar/pexels-steve-30889893_haorin.jpg',
	className = 'size-52 border-4 border-white ',
	multi = false,
}: UploadAvatarProps) {
	const form = useFormContext();

	const [uploadData, setUploadData] = useState<DataUpload>({
		src,
		uploadId: Helper.randomKey(),
	});
	const { isLoadingUploadCoverImagePlaylistService, onUploadCoverImagePlaylist } = ServiceUploadCoverImagePlaylist({
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
			onUploadCoverImagePlaylist(formData);
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
				{isLoadingUploadCoverImagePlaylistService && (
					<div className='absolute top-0 left-0 w-full h-full bg-primary_dark/80 rounded-lg flex items-center justify-center z-20'>
						<BallLoader />
					</div>
				)}
				<Avatar className={`relative ${className}`} src={uploadData.src} />
				<div className='w-fit absolute bottom-4 right-4 cursor-pointer overflow-hidden'>
					<label className='buttonFollow group relative rounded-lg min-w-60 size-60' htmlFor='avatar'>
						<p className='bg-primary_light text-primary_dark flex items-center w-32 group-hover:bg-primary_light/80 transition-all duration-500 gap-2 px-4 py-3 rounded-full text-base font-semibold'>
							<MdOutlineFileUpload className='text-2xl' />
							{Localize('UPLOAD')}
						</p>
						<input
							multiple={multi}
							onChange={handleOnChange}
							className='w-full h-full absolute top-0 opacity-0'
							name='avatar'
							id='avatar'
							type='file'
						/>
					</label>
				</div>
			</div>
		</div>
	);
}

export default UploadRequest;
