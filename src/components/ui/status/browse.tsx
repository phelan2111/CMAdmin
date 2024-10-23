import Localize from '@/langs';
import { EnumStatusBrowse } from '@/utils/enums';

type StatusBrowseProps = {
	status: EnumStatusBrowse;
};

type ParseUiStatusBrowse = {
	className: string;
	text: string;
};
const parseUiStatusBrowse: Record<EnumStatusBrowse, ParseUiStatusBrowse> = {
	[EnumStatusBrowse.display]: {
		className: 'bg-green-500',
		text: 'DISPLAY',
	},
	[EnumStatusBrowse.hidden]: {
		className: 'bg-red-500',
		text: 'HIDDEN',
	},  
};
function StatusBrowse(props: StatusBrowseProps) {
	const statusItem = parseUiStatusBrowse[props.status];
	return (
		<div className='flex items-center gap-2'>
			<div className={`w-2 h-2 ${statusItem.className} rounded-full`} />
			<p className='m-0 font-semibold'>{Localize(statusItem.text)}</p>
		</div>
	);
}

export default StatusBrowse;
