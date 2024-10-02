import Select from '@/components/root/inputs/select';
import Localize from '@/langs';

function Take() {
	return (
		<div className='flex gap-3 items-center'>
			<div className='flex items-center gap-2'>
				<p>{Localize('LINES_PER_PAGE')}</p>
			</div>
			<div className='w-20'>
				<Select
					defaultSelect={{
						label: '10',
						value: 10,
					}}
					classNameInput='h-8 text-white'
					data={[
						{
							label: '10',
							value: 10,
						},
						{
							label: '15',
							value: 15,
						},
					]}
				/>
			</div>
		</div>
	);
}

export default Take;
