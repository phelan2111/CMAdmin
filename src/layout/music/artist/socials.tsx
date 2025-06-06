import Input from '@/components/ui/input/input';
import Localize from '@/langs';
import { ReactNode } from 'react';

type SocialsProps = {
	icon: ReactNode;
	text: string;
	name: string;
	className?: string;
};
function Socials(props: SocialsProps) {
	return (
		<div className='flex flex-col gap-2 animate-translateRight'>
			<div className='flex gap-2 items-center'>
				{props.icon}
				<p>{Localize(props.text)}</p>
			</div>
			<Input className={props.className} classNameInput='!text-white' name={props.name} />
		</div>
	);
}

export default Socials;
