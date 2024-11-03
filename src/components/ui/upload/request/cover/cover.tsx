/* eslint-disable react-hooks/exhaustive-deps */
import CoverImage from '@/components/root/image/cover';
import { DataUpload } from '@/components/root/upload/normal';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import BallLoader from '@/components/ui/loader/ball';
import ServiceUploadUser from '@/services/user/upload';
import { ResponseUpload } from '@/services/types';
import { UploadAvatarProps } from '@/layout/account/upload/types';
import { useFormContext } from 'react-hook-form';

function UploadCoverRequestAccount({
	name = '',
	src = 'http://res.cloudinary.com/dkvhfe4uu/image/upload/v1730217804/user/image/pexels-vishnurnair-1105666_qf6gvs.jpg',
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
			setUploadData({
				src: dataItem.link,
				uploadId: Helper.randomKey(),
			});
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
		<div className='relative z-0'>
			{isLoadingUploadUserService && (
				<div className='absolute top-0 left-0 w-full h-full bg-primary_dark/80 rounded-lg flex items-center justify-center z-20'>
					<BallLoader />
				</div>
			)}
			<CoverImage className='border-2 border-white w-full h-72' src={uploadData.src} />
			<div className='absolute top-6 right-8 z-10 flex w-fit gap-2'>
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

export default UploadCoverRequestAccount;
