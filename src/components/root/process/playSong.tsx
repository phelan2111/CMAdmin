/* eslint-disable react-hooks/exhaustive-deps */
import { Helper } from '@/utils/helper';
import { useMemo } from 'react';

type ProcessPlaySongProps = {
	duration: number;
	timeCurrent: number;
};
function ProcessPlaySong({ duration = 1, timeCurrent }: ProcessPlaySongProps) {
	const widthProcess = useMemo(() => {
		const widthOfPer = Math.floor(400 / duration);
		return !isFinite(widthOfPer) ? 0 : widthOfPer;
	}, [duration]);

	return (
		<div className='flex text-xs gap-2 items-center'>
			<div>
				{Helper.convertTime(timeCurrent).minus}:{Helper.convertTime(timeCurrent).second}
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
				{Helper.convertTime(duration).minus}:{Helper.convertTime(duration).second}
			</div>
		</div>
	);
}

export default ProcessPlaySong;
