import Paging from '@/components/ui/common/paging/paging';
import Localize from '@/langs';
import { GridProps } from './types';
import Empty from '@/components/ui/empty/normal';
import EmptyTable from '@/components/ui/empty/table';
import Loading from '@/components/root/loading/normal';
import LoaderTable from '@/components/ui/loader/table';

function Grid({ data = [], ...props }: GridProps) {
	return (
		<div className='flex flex-col gap-6'>
			<div
				style={{
					minHeight: 'calc(100dvh - 480px)',
				}}>
				<table className='w-full'>
					<thead className='w-full sticky top-0'>
						<tr className='w-full bg-white text-primary_dark-20'>
							{props.gridColum.map((headers, index) => {
								return (
									<th key={headers.field} className='overflow-hidden first:rounded-l-md last:rounded-r-md'>
										{headers.headers?.({
											index,
											title: headers.title,
										}) ?? (
											<div className='text-start uppercase font-normal text-base py-3 px-4'>
												<p className='truncate'>{Localize(headers.title)}</p>
											</div>
										)}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className='w-full'>
						<Loading renderProps={() => <LoaderTable colSpan={props.gridColum.length} />} isLoading={props.isLoading}>
							<Empty
								componentEmpty={() => {
									return <EmptyTable totalColumn={props.gridColum.length} />;
								}}
								isEmpty={props.total === 0}>
								{data.map((item, index) => {
									return (
										<tr key={`tableRoot_${index}`} className='group h-fit border-white/10 last:border-transparent'>
											{props.gridColum.map((column, indexColumn) => {
												const itemColumn = item[column.field] as string | number;
												return (
													<td key={`${column}_${indexColumn}_${index}`} className='p-0 h-fit border-b border-inherit'>
														<div
															aria-hidden
															onClick={() => {
																props.onClickRow?.(item as never);
															}}
															className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5 font-semibold'>
															{column.cell?.({
																dataItem: item as never,
																field: column.field,
																indexDataItem: index,
															}) ?? itemColumn}
														</div>
													</td>
												);
											})}
										</tr>
									);
								})}
							</Empty>
						</Loading>
					</tbody>
				</table>
			</div>
			<div className='flex items-center justify-between'>
				<Paging totalRecord={props.total} onChange={props.onChangePaging} />
			</div>
		</div>
	);
}

export default Grid;
