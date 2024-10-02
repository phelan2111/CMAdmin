import Skip from './skip';
import Take from './take';

function Paging() {
	return (
		<div className='flex items-center gap-14'>
			<Skip />
			<Take />
		</div>
	);
}

export default Paging;
