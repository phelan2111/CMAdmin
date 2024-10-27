import Localize from '@/langs';
import EmptyComponent from '../common/empty';

type EmptySelectProps = {
	className?: string;
};
function EmptySelect({ className = 'bg-white/20' }: EmptySelectProps) {
	return (
		<div className={`justify-center items-center p-2 flex flex-col gap-2 rounded-sm ${className}`}>
			<EmptyComponent />
			<div>
				<p className='text-center font-bold'>{Localize('NO_DATA')}</p>
			</div>
		</div>
	);
}

export default EmptySelect;
