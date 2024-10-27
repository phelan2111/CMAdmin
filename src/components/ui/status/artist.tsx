import Localize from '@/langs';
import { EnumStatusArtist } from '@/utils/enums';

type StatusArtistProps = {
	status: EnumStatusArtist;
};

type ParseUiStatusArtist = {
	className: string;
	bgClass?: string;
	text: string;
};
const parseUiStatusArtist: Record<EnumStatusArtist, ParseUiStatusArtist> = {
	[EnumStatusArtist.active]: {
		className: 'bg-green-500',
		bgClass: 'bg-green-300/20 px-2 py-1 rounded-2xl',
		text: 'ACTIVE',
	},
	[EnumStatusArtist.lock]: {
		className: 'bg-red-500',
		bgClass: 'bg-red-300/20 px-2 py-1 rounded-2xl',
		text: 'LOCK',
	},
	[EnumStatusArtist.inactive]: {
		className: 'bg-gray-500',
		bgClass: 'bg-gray-300/20 px-2 py-1 rounded-2xl',
		text: 'INACTIVE',
	},
};
function StatusArtist(props: StatusArtistProps) {
	const statusItem = parseUiStatusArtist[props.status];
	return (
		<div className={`flex items-center gap-2 ${statusItem.bgClass}`}>
			<div className={`w-2 h-2 ${statusItem.className} rounded-full`} />
			<p className='m-0 font-semibold'>{Localize(statusItem.text)}</p>
		</div>
	);
}

export default StatusArtist;
