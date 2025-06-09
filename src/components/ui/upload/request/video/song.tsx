import { DataUpload } from '@/components/root/upload/normal';
import Video from '@/components/root/video/video';
import SetUpSongControl from '@/components/ui/control/setUpSong';
import BallLoader from '@/components/ui/loader/ball';
import Localize from '@/langs';
import { TypeFileSetUpSong } from '@/utils/enums';
import { ChangeEvent, useRef, useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
type DurationVideo = {
	currentTime: number;
	timeTotal: number;
};

type SongUploadProps = {
	isLoading: boolean;
	isDetails?: boolean;
	onChange: (dataItem: ChangeEvent<HTMLInputElement>) => void;
	data: DataUpload;
	typeUpload: TypeFileSetUpSong;
};

function SongUpload(props: SongUploadProps) {
	const ref = useRef<HTMLVideoElement>(null);
	const [duration, setDuration] = useState<DurationVideo>({
		currentTime: 0,
		timeTotal: 0,
	});

	const handlePlay = () => {
		if (ref.current) {
			(ref.current.currentTime = 0), ref.current.play();
		}
	};
	const handlePause = () => {
		if (ref.current) {
			ref.current.pause();
		}
	};

	return (
		<div className='bg-primary_dark/50 shadow-bootstrapLarge flex flex-col gap-4 rounded-lg p-6 animate-translateRight relative'>
			{props.isLoading && (
				<div className='absolute top-0 left-0 w-full h-full bg-primary_dark/80 rounded-lg flex items-center justify-center z-20'>
					<BallLoader />
				</div>
			)}
			<div className='h-[350px]'>
				<Video
					typeUpload={props.typeUpload}
					key={props.data.src}
					id='song'
					onLoadedData={(event) => {
						setDuration({
							currentTime: 0,
							timeTotal: event.currentTarget.duration,
						});
					}}
					onTimeUpdate={(event) => {
						setDuration({
							currentTime: event.currentTarget.currentTime,
							timeTotal: duration.timeTotal,
						});
					}}
					ref={ref}
					className='rounded-xl h-full'
					src={props.data.src}
					track={props.data.src}
				/>
			</div>
			{!props.isDetails && (
				<div className='absolute top-14 right-14 z-10 flex w-fit gap-2'>
					<label className='buttonFollow group !rounded-full' htmlFor='songVideo'>
						<p className='bg-primary_dark text-primary_light flex items-center group-hover:bg-primary_dark/10 transition-all duration-500 gap-2 px-4 py-3 rounded-full text-base font-semibold'>
							<MdOutlineFileUpload className='text-2xl text-primary_light' />
							{Localize('UPLOAD')}
						</p>
						{props.typeUpload === TypeFileSetUpSong.mp3 && (
							<input accept='audio/*' multiple onChange={props.onChange} className='hidden' name='songVideo' id='songVideo' type='file' />
						)}
						{props.typeUpload === TypeFileSetUpSong.video && (
							<input
								accept='video/mp4,video/x-m4v,video/*'
								multiple
								onChange={props.onChange}
								className='hidden'
								name='songVideo'
								id='songVideo'
								type='file'
							/>
						)}
					</label>
				</div>
			)}
			<SetUpSongControl timeCurrent={duration.currentTime} duration={duration.timeTotal} onPause={handlePause} onPlay={handlePlay} />
		</div>
	);
}

export default SongUpload;
