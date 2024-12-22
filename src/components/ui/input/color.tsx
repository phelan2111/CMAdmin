import TextField from '@/components/root/inputs/textField';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import 'styles/common/input/color.scss';

type InputColorProps = {
	label?: string;
};

const InputColor = (props: InputColorProps) => {
	return (
		<div className='flex items-center bg-white/10 py-1 rounded-full cursor-pointer group'>
			{!Helper.isEmpty(props.label) && (
				<p className='w-0 group-hover:pl-4 group-hover:w-[108px] text-nowrap transition-all duration-500 overflow-hidden'>
					{Localize(props.label as string)}
				</p>
			)}

			<TextField className='!bg-transparent' classNameInput='inputColor' type='color' />
		</div>
	);
};

export default InputColor;
