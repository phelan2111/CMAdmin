/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from '@/components/root/image/avatar';
import { DataUpload } from '@/components/root/upload/normal';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { UploadAvatarProps } from '../../../../../layout/account/upload/types';
import ServiceUploadUser from '@/services/user/upload';
import { ResponseUpload } from '@/services/types';
import BallLoader from '@/components/ui/loader/ball';
import { useFormContext } from 'react-hook-form';

function AvatarUploadRequestAccount({
	name = '',
	src = 'http://res.cloudinary.com/dkvhfe4uu/image/upload/v1730217712/user/image/pexels-pixabay-161154_sclyji.jpg',
}: UploadAvatarProps) {
	const form = useFormContext();

	const srcValue = useMemo(() => {
		return src ?? form?.getValues()?.[name];
	}, [src, form, name]);
	const [uploadData, setUploadData] = useState<DataUpload>({
		src: srcValue,
		uploadId: Helper.randomKey(),
	});
	const { isLoadingUploadUserService, onUploadUser } = ServiceUploadUser({
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
			onUploadUser(formData);
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
				{isLoadingUploadUserService && (
					<div className='absolute top-0 left-0 w-full h-full bg-primary_dark/80 rounded-full flex items-center justify-center z-20'>
						<BallLoader />
					</div>
				)}
				<Avatar className='size-52 border-4 border-white relative z-10' src={uploadData.src} />
				<div className='absolute top-16 left-0 translate-x-44'>
					<div className='bg-white py-4 px-6 w-[200px] flex justify-end rounded-r-full'>
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

export default AvatarUploadRequestAccount;
