import Button from '@/components/root/button';
import Localize from '@/langs';
import { EnumStatusSong } from '@/utils/enums';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

type ActionPlaylistProps = {
	status: EnumStatusSong;
	onHidden: VoidFunction;
	onDisplay: VoidFunction;
};

function ActionPlaylist(props: ActionPlaylistProps) {
	const isDisplay = props.status === EnumStatusSong.display;

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

export default ActionPlaylist;
