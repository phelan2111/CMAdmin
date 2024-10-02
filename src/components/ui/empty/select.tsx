import EmptyComponent from '../common/empty';

function EmptySelect() {
	return (
		<div className='bg-white/20 p-2 flex flex-col gap-2 rounded-sm'>
			<EmptyComponent />
			<div>
				<p className='text-center font-bold'>No Data</p>
			</div>
		</div>
	);
}

export default EmptySelect;
