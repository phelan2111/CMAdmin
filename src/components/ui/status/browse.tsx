import Localize from '@/langs';
import { EnumStatusBrowse } from '@/utils/enums';

type StatusBrowseProps = {
	status: EnumStatusBrowse;
};

type ParseUiStatusBrowse = {
	className: string;
	bgClass?: string;
	text: string;
};
const parseUiStatusBrowse: Record<EnumStatusBrowse, ParseUiStatusBrowse> = {
	[EnumStatusBrowse.display]: {
		className: 'bg-green-500',
		bgClass: 'bg-green-300/20 px-2 py-1 rounded-2xl',
		text: 'DISPLAY',
	},
	[EnumStatusBrowse.hidden]: {
		className: 'bg-red-500',
		bgClass: 'bg-red-300/20 px-2 py-1 rounded-2xl',
		text: 'HIDDEN',
	},
};
function StatusBrowse(props: StatusBrowseProps) {
	const statusItem = parseUiStatusBrowse[props.status];
	return (
		<div className={`flex items-center gap-2 w-fit ${statusItem.bgClass}`}>
			<div className={`w-2 h-2 ${statusItem.className} rounded-full`} />
			<p className='m-0 font-semibold text-base'>{Localize(statusItem.text)}</p>
		</div>
	);
}

export default StatusBrowse;
