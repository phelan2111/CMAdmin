import '@/styles/common/loader/ball.scss';

function BallLoader() {
	return (
		<div className='loader-ball'>
			<div className='loader-ball__circle'></div>
			<div className='loader-ball__circle'></div>
			<div className='loader-ball__circle'></div>
			<div className='loader-ball__circle'></div>
			<div className='loader-ball__circle'></div>
		</div>
	);
}

export default BallLoader;
