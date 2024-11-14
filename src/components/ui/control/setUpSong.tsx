/* eslint-disable react-hooks/exhaustive-deps */
import ProcessPlaySong from '@/components/root/process/playSong';
import { useEffect, useState } from 'react';
import { IoIosPause, IoIosPlay } from 'react-icons/io';

type SetUpSongControlProps = {
	onPlay: VoidFunction;
	onPause: VoidFunction;
	duration?: number;
	timeCurrent?: number;
};
function SetUpSongControl({ duration = 0, timeCurrent = 0, ...props }: SetUpSongControlProps) {
	const [hasPlayed, setHasPlayed] = useState<boolean>(false);

	const handleToggle = () => {
		setHasPlayed((prev) => !prev);
		if (!hasPlayed) {
			props.onPlay();
		} else {
			props.onPause();
		}
	};

	useEffect(() => {
		const hasDone = duration < timeCurrent;
		if (hasDone) {
			setHasPlayed(false);
		}
	}, [timeCurrent]);

	return (
		<div className='flex flex-col gap-1 justify-center items-center'>
			<div className='text-2xl flex gap-4 items-center'>
				<div
					aria-hidden
					onClick={handleToggle}
					className='min-w-10 h-10 bg-primary_dark-20 rounded-full flex justify-center duration-500 items-center transition-transform hover:scale-110 cursor-pointer'>
					{!hasPlayed ? <IoIosPlay /> : <IoIosPause />}
				</div>
			</div>
			<ProcessPlaySong timeCurrent={timeCurrent} duration={duration} />
		</div>
	);
}

export default SetUpSongControl;
