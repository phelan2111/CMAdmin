import Paging from '@/components/ui/common/paging/paging';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';

function Grid() {
	return (
		<div className='flex flex-col gap-6'>
			<table className='w-full'>
				<thead className='w-full'>
					<tr className='w-full'>
						<th className='overflow-hidden first:rounded-l-md last:rounded-r-md pb-3'>
							<div className='text-start uppercase font-normal text-base py-3 px-4'>
								<p className='truncate'>Status</p>
							</div>
						</th>
						<th className='overflow-hidden first:rounded-l-md last:rounded-r-md pb-3'>
							<div className='text-start uppercase font-normal text-base py-3 px-4'>
								<p className='truncate'>Client</p>
							</div>
						</th>
						<th className='overflow-hidden first:rounded-l-md last:rounded-r-md pb-3'>
							<div className='text-start uppercase font-normal text-base py-3 px-4'>
								<p className='truncate'>Assigned To</p>
							</div>
						</th>
						<th className='overflow-hidden first:rounded-l-md last:rounded-r-md pb-3'>
							<div className='text-start uppercase font-normal text-base py-3 px-4'>
								<p className='truncate'>Date</p>
							</div>
						</th>
						<th className='overflow-hidden first:rounded-l-md last:rounded-r-md pb-3'>
							<div className='text-start uppercase font-normal text-base py-3 px-4'>
								<p className='truncate'>Time</p>
							</div>
						</th>
						<th className='overflow-hidden first:rounded-l-md last:rounded-r-md pb-3'>
							<div className='text-start uppercase font-normal text-base py-3 px-4'>
								<p className='truncate'>RO#</p>
							</div>
						</th>
						<th className='overflow-hidden first:rounded-l-md last:rounded-r-md pb-3'>
							<div className='text-start uppercase font-normal text-base py-3 px-4'>
								<p className='truncate'>Claim number</p>
							</div>
						</th>
						<th className='overflow-hidden first:rounded-l-md last:rounded-r-md pb-3'>
							<div className='text-start uppercase font-normal text-base py-3 px-4'>
								<p className='truncate'>Amount</p>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className='group border-white/10 last:border-transparent'>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
					</tr>
					<tr className='group border-white/10 last:border-transparent'>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
						<td className='p-0 border-b border-inherit'>
							<div className='h-20 flex items-center transition-all py-2 px-4 cursor-pointer duration-300 group-hover:bg-white/5'>qwewqewqe</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<p>{Localize('SHOWING')}</p>
					<b>{Helper.formatNumber(2)}</b>
					<span>
						{Localize('OF')} {Helper.formatNumber(1123)}
					</span>
				</div>
				<Paging />
			</div>
		</div>
	);
}

export default Grid;
