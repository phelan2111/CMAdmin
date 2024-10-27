import Button from '@/components/root/button';
import Localize from '@/langs';
import { EnumStatusBrowse } from '@/utils/enums';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

type ActionBrowseProps = {
	status: EnumStatusBrowse;
	onHidden: VoidFunction;
	onDisplay: VoidFunction;
};

function ActionBrowse(props: ActionBrowseProps) {
	const isDisplay = props.status === EnumStatusBrowse.display;

	if (isDisplay) {
		return (
			<Button onClick={props.onHidden} className='!bg-transparent w-fit border border-[#FF8A8A] !rounded-3xl text-[#FF8A8A] hover:!bg-[#FF8A8A]/10'>
				<div className='flex gap-2 px-4 items-center'>
					<RxEyeClosed />
					{Localize('HIDDEN')}
				</div>
			</Button>
		);
	}
	return (
		<Button onClick={props.onDisplay} className='!bg-transparent w-fit border border-[#41B3A2] !rounded-3xl text-[#41B3A2] hover:!bg-[#41B3A2]/10'>
			<div className='flex gap-2 px-4 items-center'>
				<RxEyeOpen />
				{Localize('DISPLAY')}
			</div>
		</Button>
	);
}

export default ActionBrowse;
