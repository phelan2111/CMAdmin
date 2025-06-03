import CoverImage from '@/components/root/image/cover';
import { DataUpload } from '@/components/root/upload/normal';
import UpdateButton from '@/components/ui/button/update';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { ChangeEvent, useEffect, useState } from 'react';
import { MdOutlineFileUpload, MdOutlineSaveAlt } from 'react-icons/md';
import { UploadAvatarProps } from '../../../../layout/account/upload/types';

function UploadCoverAccount({
	src = 'https://res.cloudinary.com/dkvhfe4uu/image/upload/v1748598392/singer/image/avatar/pexels-steve-30889893_haorin.jpg',
	...props
}: UploadAvatarProps) {
	const [uploadData, setUploadData] = useState<DataUpload>({
		src,
		uploadId: Helper.randomKey(),
	});

	const handleOnChange = (dataItem: ChangeEvent<HTMLInputElement>) => {
		const fileList = dataItem.currentTarget.files;

		if (fileList) {
			const files = Object.values(fileList);
			const dataUploadConvert: DataUpload[] = files.map((file) => ({
				src: URL.createObjectURL(file),
				uploadId: Helper.randomKey(),
				file,
			}));
			setUploadData(dataUploadConvert[0]);
		}
	};

	useEffect(() => {
		if (!Helper.isEmpty(src)) {
			setUploadData({
				src,
				uploadId: Helper.randomKey(),
			});
		}
	}, [src]);

	return (
		<div className='relative'>
			<CoverImage className='border-2 border-white w-full h-72' src={uploadData.src} />
			<div className='absolute top-8 right-8 z-10 flex w-fit gap-2'>
				<UpdateButton
					disabled={Helper.isEmpty(uploadData.file)}
					className='font-semibold text-base !w-32 buttonFollow'
					icon={<MdOutlineSaveAlt className='text-2xl' />}
					text='SAVE'
					onClick={() => {
						props.onChange?.(uploadData);
					}}
				/>
				<label className='buttonFollow group !rounded-full' htmlFor='cover'>
					<p className='bg-primary_dark text-primary_light flex items-center w-32 group-hover:bg-primary_dark/10 transition-all duration-500 gap-2 px-4 py-3 rounded-full text-base font-semibold'>
						<MdOutlineFileUpload className='text-2xl' />
						{Localize('UPLOAD')}
					</p>
					<input onChange={handleOnChange} className='hidden' name='cover' id='cover' type='file' />
				</label>
			</div>
		</div>
	);
}

export default UploadCoverAccount;
