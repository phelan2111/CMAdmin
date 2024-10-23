import Localize from '@/langs';
import { EnumStatusArtist } from '@/utils/enums';

type StatusArtistProps = {
	status: EnumStatusArtist;
};

type ParseUiStatusArtist = {
	className: string;
	text: string;
};
const parseUiStatusArtist: Record<EnumStatusArtist, ParseUiStatusArtist> = {
	[EnumStatusArtist.active]: {
		className: 'bg-green-500',
		text: 'ACTIVE',
	},
	[EnumStatusArtist.lock]: {
		className: 'bg-red-500',
		text: 'LOCK',
	},
	[EnumStatusArtist.inactive]: {
		className: 'bg-gray-500',
		text: 'INACTIVE',
	},
};
function StatusArtist(props: StatusArtistProps) {
	const statusItem = parseUiStatusArtist[props.status];
	return (
		<div className='flex items-center gap-2'>
			<div className={`w-2 h-2 ${statusItem.className} rounded-full`} />
			<p className='m-0 font-semibold'>{Localize(statusItem.text)}</p>
		</div>
	);
}

export default StatusArtist;
