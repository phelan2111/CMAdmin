import Select, { ItemSelect } from '@/components/root/inputs/select';
import Localize from '@/langs';
type TakeProps = {
	onChange: (take: number) => void;
	take: number;
};

const dataTake: ItemSelect[] = [
	{
		label: '5',
		value: 5,
	},
	{
		label: '10',
		value: 10,
	},
	{
		label: '15',
		value: 15,
	},
];
function Take(props: TakeProps) {
	const handleOnChange = (dataItem: ItemSelect) => {
		props.onChange(dataItem.value as number);
	};

	return (
		<div className='flex gap-3 items-center py-2'>
			<div className='flex items-center gap-2'>
				<p>{Localize('LINES_PER_PAGE')}</p>
			</div>
			<div className='w-20'>
				<Select onChange={handleOnChange} defaultSelect={dataTake[0]} classNameInput='!h-8 text-white' data={dataTake} />
			</div>
		</div>
	);
}

export default Take;
