import Localize from '@/langs';
import { EnumStatusSong } from '@/utils/enums';

type StatusSongProps = {
	status: EnumStatusSong;
};

type ParseUiStatusSong = {
	className: string;
	bgClass?: string;
	text: string;
};
const parseUiStatusSong: Record<EnumStatusSong, ParseUiStatusSong> = {
	[EnumStatusSong.display]: {
		className: 'bg-green-500',
		bgClass: 'bg-green-300/20 px-2 py-1 rounded-2xl',
		text: 'DISPLAY',
	},
	[EnumStatusSong.hidden]: {
		className: 'bg-red-500',
		bgClass: 'bg-red-300/20 px-2 py-1 rounded-2xl',
		text: 'HIDDEN',
	},
};
function StatusSong(props: StatusSongProps) {
	const statusItem = parseUiStatusSong[props.status];
	return (
		<div className={`flex items-center gap-2 w-fit ${statusItem.bgClass}`}>
			<div className={`w-2 h-2 ${statusItem.className} rounded-full`} />
			<p className='m-0 font-semibold text-base'>{Localize(statusItem.text)}</p>
		</div>
	);
}

export default StatusSong;
