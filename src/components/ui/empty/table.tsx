import EmptyComponent from '../common/empty';

type EmptyTableProps = { totalColumn: number };

function EmptyTable(props: EmptyTableProps) {
	return (
		<tr>
			<td colSpan={props.totalColumn}>
				<div
					style={{
						height: 'calc(100dvh - 435px)',
					}}
					className='bg-white/10 p-4 flex flex-col justify-center items-center gap-6 rounded-md'>
					<EmptyComponent />
					<p>NO DATA</p>
				</div>
			</td>
		</tr>
	);
}

export default EmptyTable;
