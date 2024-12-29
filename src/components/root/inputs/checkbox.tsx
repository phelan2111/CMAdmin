import Localize from '@/langs';
import { useState } from 'react';
import { HiCheck } from 'react-icons/hi';

interface ICheckboxProps {
	label?: {
		direction: 'vertical' | 'horizontal';
		text: string;
	};
	className?: string;
	name?: string;
	onChange?: VoidFunction;
}

function Checkbox(props: ICheckboxProps) {
	const isVertical = props.label?.direction === 'vertical';
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const handleChange = () => {
		setIsChecked((prev) => !prev);
		props.onChange?.();
	};
	return (
		<div className={`flex ${isVertical ? 'flex-col gap-0.5' : 'flex-row gap-2 items-end'}`}>
			<div
				aria-hidden='true'
				onClick={() => {
					handleChange();
				}}
				className={`w-4 h-4 border border-white rounded-sm flex justify-center items-center transition-colors duration-500 cursor-pointer ${
					isChecked ? 'bg-white text-primary_dark' : 'text-transparent'
				}`}>
				<HiCheck className='text-xs' />
			</div>
			{props.label && <p className='text-xs'>{Localize(props.label.text)}</p>}
		</div>
	);
}

export default Checkbox;
