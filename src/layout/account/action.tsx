import Button from '@/components/root/button';
import Localize from '@/langs';
import { EnumStatusAccount } from '@/utils/enums';
import { CiLock, CiUnlock } from 'react-icons/ci';
import { Fragment } from 'react/jsx-runtime';

type ActionAccountProps = {
	status: EnumStatusAccount;
	onActive: VoidFunction;
	onLock: VoidFunction;
};

function ActionAccount(props: ActionAccountProps) {
	const isLock = props.status === EnumStatusAccount.lock;
	const isActive = props.status === EnumStatusAccount.active;

	if (isLock) {
		return (
			<Button onClick={props.onActive} className='!bg-[#41B3A2]/70 w-fit !rounded-3xl text-white hover:!bg-[#41B3A2]/50'>
				<div className='flex gap-2 px-4 items-center font-medium'>
					<CiUnlock />
					{Localize('UNLOCK')}
				</div>
			</Button>
		);
	}
	if (isActive) {
		return (
			<Button onClick={props.onLock} className='!bg-[#F94C66]/70 w-fit !rounded-3xl text-white hover:!bg-[#F94C66]/50'>
				<div className='flex gap-2 px-4 items-center capitalize'>
					<CiLock />
					{Localize('LOCK')}
				</div>
			</Button>
		);
	}
	return <Fragment />;
}

export default ActionAccount;
