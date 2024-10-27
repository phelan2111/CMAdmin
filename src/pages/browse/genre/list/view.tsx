import Button from '@/components/root/button';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import TableGenre from '@/layout/browse/table/genre';
import { ResponseGetGenreOfBrowse } from '@/services/browse/genre/getList';
import { ResponseRequest } from '@/services/types';
import { FucCreateGenreProps } from '../types';
import { PagingState } from '@/components/root/grid/types';
import FilterStatusTool, { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import SearchTool from '@/components/ui/common/tool/search/normal';
import { dataFilter } from 'pages/browse/variables';
import CreateGenreOfBrowse from '../create';

type ViewProps = {
	data: ResponseRequest<ResponseGetGenreOfBrowse>;
	isLoading: boolean;
	onCreateGenre: (renderProps: FucCreateGenreProps) => void;
	onChangePaging?: (dataPaging: PagingState) => void;
	onChangeSearch: (dataItem: string) => void;
	onChangeFilterStatus: (dataItem: FilterStatusItem) => void;
};

function View(props: ViewProps) {
	return (
		<div className='pr-4 py-8'>
			<Wrapper className='flex flex-col gap-20'>
				<div className='flex justify-between items-end animate-translateRight'>
					<div className='leading-10'>
						<h1 className='text-5xl font-semibold'>{Localize('BROWSE')}</h1>
						<p>It is list of browse in the system</p>
					</div>
					<div className='w-40'>
						<Button
							onClick={() => {
								props.onCreateGenre({
									renderComponent: <CreateGenreOfBrowse />,
								});
							}}
							className='!bg-white/80 w-full text-primary_dark !rounded-md hover:!bg-white/50'>
							{Localize('CREATE_GENRE')}
						</Button>
					</div>
				</div>
				<div className='rounded-xl px-3 py-3 flex items-center justify-between animate-translateRight'>
					<FilterStatusTool onChange={props.onChangeFilterStatus} data={dataFilter} />
					<SearchTool onChange={props.onChangeSearch} />
				</div>
				<div className='flex flex-col gap-4 h-full animate-translateRight'>
					<TableGenre isLoading={props.isLoading} data={props.data.list} total={props.data.total} />
				</div>
			</Wrapper>
		</div>
	);
}

export default View;
