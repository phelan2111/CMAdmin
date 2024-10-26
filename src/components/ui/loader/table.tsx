import Localize from '@/langs';
import EmptyComponent from '../common/empty';

type LoaderTableProps = {
	colSpan: number;
};

function LoaderTable(props: LoaderTableProps) {
	return (
		<tr>
			<td colSpan={props.colSpan}>
				<div
					style={{
						height: 'calc(100dvh - 535px)',
					}}
					className='w-full flex flex-col gap-6 items-center justify-center'>
					<EmptyComponent />
					<p className='uppercase animate-translateRight'>{Localize('LOADING')}</p>
				</div>
			</td>
		</tr>
	);
}

export default LoaderTable;
