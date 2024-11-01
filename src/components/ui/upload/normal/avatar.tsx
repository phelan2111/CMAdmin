import Avatar from '@/components/root/image/avatar';
import { DataUpload } from '@/components/root/upload/normal';
import UpdateButton from '@/components/ui/button/update';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { ChangeEvent, useEffect, useState } from 'react';
import { MdOutlineFileUpload, MdOutlineSaveAlt } from 'react-icons/md';
import { UploadAccountProps } from '../../../../layout/account/upload/types';

function AvatarUploadAccount({
	src = 'http://res.cloudinary.com/dkvhfe4uu/image/upload/v1730217712/user/image/pexels-pixabay-161154_sclyji.jpg',
	...props
}: UploadAccountProps) {
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
		<div className='-translate-y-1/2 px-16 flex items-end'>
			<div className='relative'>
				<Avatar className='size-52 border-4 border-white relative z-10' src={uploadData.src} />
				<div className='absolute top-16 left-0 translate-x-44'>
					<div className='bg-white py-4 px-6 w-[300px] flex justify-end rounded-r-full'>
						<UpdateButton
							disabled={Helper.isEmpty(uploadData.file)}
							className='font-semibold text-base !w-32 buttonFollow'
							icon={<MdOutlineSaveAlt className='text-2xl' />}
							text='SAVE'
							onClick={() => {
								props.onChange?.(uploadData);
							}}
						/>
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

export default AvatarUploadAccount;
