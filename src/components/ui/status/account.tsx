import Localize from '@/langs';
import { EnumStatusAccount } from '@/utils/enums';

type StatusAccountProps = {
	status: EnumStatusAccount;
};

type ParseUiStatusAccount = {
	className: string;
	text: string;
};
const parseUiStatusAccount: Record<EnumStatusAccount, ParseUiStatusAccount> = {
	[EnumStatusAccount.authorized]: {
		className: 'bg-green-500',
		text: 'AUTHORIZED',
	},
	[EnumStatusAccount.declined]: {
		className: 'bg-red-500',
		text: 'DECLINED',
	},
	[EnumStatusAccount.pending]: {
		className: 'bg-yellow-500',
		text: 'PENDING',
	},
};
function StatusAccount(props: StatusAccountProps) {
	const statusItem = parseUiStatusAccount[props.status];
	return (
		<div className='flex items-center gap-2'>
			<div className={`w-2 h-2 ${statusItem.className} rounded-full`} />
			<p className='m-0 font-semibold'>{Localize(statusItem.text)}</p>
		</div>
	);
}

export default StatusAccount;
