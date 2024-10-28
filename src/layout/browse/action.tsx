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
			<Button onClick={props.onHidden} className='!bg-[#F94C66]/70 w-fit !rounded-3xl text-white hover:!bg-[#F94C66]/50'>
				<div className='flex gap-2 px-4 items-center font-medium'>
					<RxEyeClosed />
					{Localize('HIDDEN')}
				</div>
			</Button>
		);
	}
	return (
		<Button onClick={props.onDisplay} className='!bg-[#41B3A2]/70 w-fit !rounded-3xl text-white hover:!bg-[#41B3A2]/50'>
			<div className='flex gap-2 px-4 items-center'>
				<RxEyeOpen />
				{Localize('DISPLAY')}
			</div>
		</Button>
	);
}

export default ActionBrowse;
