/* eslint-disable react-hooks/exhaustive-deps */
import Radio, { ItemRadio } from '@/components/root/inputs/radio';
import { TypeFileSetUpSong } from '@/utils/enums';
import { Helper } from '@/utils/helper';
import { ChangeEvent, useEffect, useState } from 'react';
import SongVideoUpload from '@/components/ui/upload/request/video/song';
import { DataUpload } from '@/components/root/upload/normal';
import { useFormContext } from 'react-hook-form';
import { UploadMediaProps } from '@/layout/account/upload/types';
import ServiceUploadMediaSong from '@/services/music/song/uploadMedia';
import { ResponseUpload } from '@/services/types';
import Localize from '@/langs';

const radioSongs: ItemRadio[] = [
	{
		value: TypeFileSetUpSong.video,
		id: Helper.randomKey(),
		label: 'VIDEO',
	},
	{
		value: TypeFileSetUpSong.mp3,
		id: Helper.randomKey(),
		label: 'MP3',
	},
];
function SetupSong({ name = '', src = '' }: UploadMediaProps) {
	const form = useFormContext();

	const [typeUpload, setTypeUpload] = useState<TypeFileSetUpSong>(TypeFileSetUpSong.video);
	const [uploadData, setUploadData] = useState<DataUpload>({
		src,
		uploadId: Helper.randomKey(),
	});

	const { isLoadingUploadMediaSongService, onUploadMediaSong } = ServiceUploadMediaSong({
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
			formData.append('media', files[0]);
			onUploadMediaSong(formData);
		}
	};

	useEffect(() => {
		if (name) {
			form?.setValue(
				name,
				{
					uploadData: uploadData,
					type: typeUpload,
				},
				{ shouldValidate: true, shouldDirty: true, shouldTouch: true },
			);
		}
	}, [name, uploadData]);

	return (
		<div className='flex flex-col gap-8'>
			<div className='flex flex-col gap-2'>
				<Radio
					label='TYPE_VIEW'
					onChange={(dataItem) => {
						setTypeUpload(dataItem.value as TypeFileSetUpSong);
					}}
					defaultValue={radioSongs[0]}
					data={radioSongs}
				/>
				<p className='text-sm'>(* {Localize('NOTE_UPLOAD_SONG')} )</p>
			</div>
			<div className='h-[470px]'>
				<SongVideoUpload data={uploadData} onChange={handleOnChange} isLoading={isLoadingUploadMediaSongService} />
			</div>
		</div>
	);
}

export default SetupSong;
