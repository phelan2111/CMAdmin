/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';

type ProcessPlaySongProps = {
	duration: number;
	timeCurrent: number;
};
function ProcessPlaySong({ duration = 1, timeCurrent }: ProcessPlaySongProps) {
	const widthProcess = useMemo(() => {
		const widthOfPer = Math.ceil(400 / duration);
		return !isFinite(widthOfPer) ? 0 : widthOfPer;
	}, [duration]);
	const convertTime = (duration: number) => {
		const minus = Math.floor(duration / 60);
		const second = duration - minus * 60;
		return {
			minus: minus.toFixed(0),
			second: second.toFixed(0),
		};
	};

	return (
		<div className='flex text-xs gap-2 items-center'>
			<div>
				{convertTime(timeCurrent).minus}:{convertTime(timeCurrent).second}
			</div>
			<div className='w-[400px] h-1 rounded-xl overflow-hidden bg-primary_dark-20'>
				<div
					style={{
						width: widthProcess * timeCurrent,
					}}
					className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1 rounded-xl'
				/>
			</div>
			<div>
				{convertTime(duration).minus}:{convertTime(duration).second}
			</div>
		</div>
	);
}

export default ProcessPlaySong;
