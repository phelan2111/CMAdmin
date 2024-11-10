import Radio, { ItemRadio } from '@/components/root/inputs/radio';
import { TypeFileSetUpSong } from '@/utils/enums';
import { Helper } from '@/utils/helper';
import { ReactNode, useState } from 'react';
import SongVideoUpload from '@/components/ui/upload/request/video/song';
import SongAudio from '@/components/ui/upload/request/audio/song';

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
function SetupSong() {
	const [typeUpload, setTypeUpload] = useState<TypeFileSetUpSong>(TypeFileSetUpSong.video);

	const renderUpload: Record<TypeFileSetUpSong, ReactNode> = {
		[TypeFileSetUpSong.mp3]: <SongAudio />,
		[TypeFileSetUpSong.video]: <SongVideoUpload />,
	};

	return (
		<div className='flex flex-col gap-8'>
			<Radio
				onChange={(dataItem) => {
					setTypeUpload(dataItem.value as TypeFileSetUpSong);
				}}
				defaultValue={radioSongs[0]}
				data={radioSongs}
			/>
			<div className='h-[470px]'>{renderUpload[typeUpload]}</div>
		</div>
	);
}

export default SetupSong;
