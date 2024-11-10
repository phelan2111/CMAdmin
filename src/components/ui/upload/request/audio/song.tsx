import Audio from '@/components/root/audio/video';
import Image from '@/components/root/image/normal';
import SetUpSongControl from '@/components/ui/control/setUpSong';
import BallLoader from '@/components/ui/loader/ball';
import Localize from '@/langs';
import { useRef, useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
type DurationVideo = {
	currentTime: number;
	timeTotal: number;
};

function SongAudio() {
	const ref = useRef<HTMLVideoElement>(null);
	const [duration, setDuration] = useState<DurationVideo>({
		currentTime: 0,
		timeTotal: 0,
	});

	const handlePlay = () => {
		if (ref.current) {
			ref.current.play();
		}
	};
	const handlePause = () => {
		if (ref.current) {
			ref.current.pause();
		}
	};

	return (
		<div className='bg-primary_dark/50 shadow-bootstrapLarge flex flex-col gap-4 rounded-lg p-6 animate-translateRight relative'>
			<div className='absolute top-0 left-0 w-full h-full bg-primary_dark/80 rounded-lg flex items-center justify-center z-20'>
				<BallLoader />
			</div>
			<Image className='w-full object-cover h-[350px]' src='https://i.pinimg.com/236x/23/ac/ef/23acefa20abaa7ad6ca22089df565d3a.jpg' />
			<Audio
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
				src='https://res.cloudinary.com/dkvhfe4uu/video/upload/v1726374670/mp3/LauLauNhacLaiLiveAtISeeYouConcert-HaNhi-9790842_rui7xw.mp3'
				track='https://res.cloudinary.com/dkvhfe4uu/video/upload/v1726374670/mp3/LauLauNhacLaiLiveAtISeeYouConcert-HaNhi-9790842_rui7xw.mp3'
			/>
			<div className='absolute top-14 right-14 z-10 flex w-fit gap-2'>
				<label className='buttonFollow group !rounded-full' htmlFor='cover'>
					<p className='bg-primary_dark text-primary_light flex items-center group-hover:bg-primary_dark/10 transition-all duration-500 gap-2 px-4 py-3 rounded-full text-base font-semibold'>
						<MdOutlineFileUpload className='text-2xl' />
						{Localize('UPLOAD')}
					</p>
					<input multiple onChange={() => {}} className='hidden' name='cover' id='cover' type='file' />
				</label>
			</div>
			<SetUpSongControl timeCurrent={duration.currentTime} duration={duration.timeTotal} onPause={handlePause} onPlay={handlePlay} />
		</div>
	);
}

export default SongAudio;
