/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from '@/components/root/image/avatar';
import { DataUpload } from '@/components/root/upload/normal';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { ChangeEvent, useEffect, useState } from 'react';
import { MdOutlineFileUpload, MdOutlineSaveAlt } from 'react-icons/md';
import { ResponseUpload } from '@/services/types';
import BallLoader from '@/components/ui/loader/ball';
import { useFormContext } from 'react-hook-form';
import ServiceUploadSinger from '@/services/music/artist/upload';
import UpdateButton from '@/components/ui/button/update';
import { UploadAvatarProps } from '../../types';

function AvatarUploadRequestSinger({
	name = '',
	src = 'https://res.cloudinary.com/dkvhfe4uu/image/upload/v1748598392/singer/image/avatar/pexels-steve-30889893_haorin.jpg',
	isDetails = false,
	...props
}: UploadAvatarProps) {
	const form = useFormContext();

	const [uploadData, setUploadData] = useState<DataUpload>({
		src,
		uploadId: Helper.randomKey(),
	});
	const { isLoadingUploadSingerService, onUploadSinger } = ServiceUploadSinger({
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
			onUploadSinger(formData);
		}
	};

	useEffect(() => {
		if (name) {
			form?.setValue(name, uploadData, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
		}
	}, [name, uploadData]);

	return (
		<div className='-translate-y-1/2 px-16 flex items-end relative z-10'>
			<div className='relative'>
				{isLoadingUploadSingerService && (
					<div className='absolute top-0 left-0 w-full h-full bg-primary_dark/80 rounded-full flex items-center justify-center z-20'>
						<BallLoader />
					</div>
				)}
				<Avatar className='size-52 border-4 border-white relative z-10' src={uploadData.src} />
				<div className='absolute top-16 left-0 translate-x-44'>
					<div className={`bg-white py-4 px-6 transition-all duration-500 flex justify-end rounded-r-full ${isDetails ? 'w-[300px]' : 'w-[200px]'}`}>
						{isDetails && (
							<UpdateButton
								disabled={uploadData.src === src}
								className='font-semibold text-base !w-32 buttonFollow'
								icon={<MdOutlineSaveAlt className='text-2xl' />}
								text='SAVE'
								onClick={() => {
									props.onChange?.(uploadData);
								}}
							/>
						)}
						<label className='buttonFollow group !rounded-full' htmlFor='avatar'>
							<p className='bg-primary_dark text-primary_light flex items-center w-32 group-hover:bg-primary_dark/10 transition-all duration-500 gap-2 px-4 py-3 rounded-full text-base font-semibold'>
								<MdOutlineFileUpload className='text-2xl' />
								{Localize('UPLOAD')}
							</p>
							<input onChange={handleOnChange} className='hidden' name='avatar' id='avatar' type='file' />
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AvatarUploadRequestSinger;
