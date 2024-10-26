import Button from '@/components/root/button';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import TableTopic from '@/layout/browse/table/topic';
import { ResponseGetTopicOfBrowse } from '@/services/browse/topic/getList';
import { ResponseRequest } from '@/services/types';
import { FucCreateTopicProps } from '../types';
import CreateTopic from '../create';
import { PagingState } from '@/components/root/grid/types';
import FilterStatusTool, { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import { Helper } from '@/utils/helper';
import { EnumStatusBrowse } from '@/utils/enums';
import SearchTool from '@/components/ui/common/tool/search/normal';

type ViewProps = {
	isLoading: boolean;
	data: ResponseRequest<ResponseGetTopicOfBrowse>;
	onCreateTopic: (renderProps: FucCreateTopicProps) => void;
	onChangePaging?: (dataPaging: PagingState) => void;
	onChangeSearch: (dataItem: string) => void;
	onChangeFilterStatus: (dataItem: FilterStatusItem) => void;
};

const dataFilter: FilterStatusItem[] = [
	{
		id: Helper.randomKey(),
		text: 'ACTIVE',
		value: EnumStatusBrowse.display,
		className: 'bg-green-500',
	},
	{
		id: Helper.randomKey(),
		text: 'HIDDEN',
		value: EnumStatusBrowse.hidden,
		className: 'bg-red-500',
	},
];

function View(props: ViewProps) {
	return (
		<div className='pr-4 py-8'>
			<Wrapper className='flex flex-col !gap-6'>
				<div className='flex justify-between items-end animate-translateRight'>
					<div className='leading-10'>
						<h1 className='text-5xl font-semibold'>{Localize('TOPIC')}</h1>
						<p>It is list of browse in the system</p>
					</div>
					<div className='w-40'>
						<Button
							onClick={() => {
								props.onCreateTopic({
									renderComponent: <CreateTopic />,
								});
							}}
							className='!bg-white/80 w-full text-primary_dark !rounded-md hover:!bg-white/50'>
							Create
						</Button>
					</div>
				</div>
				<div className='rounded-xl px-3 py-3 flex items-center justify-between'>
					<FilterStatusTool onChange={props.onChangeFilterStatus} data={dataFilter} />
					<SearchTool onChange={props.onChangeSearch} />
				</div>
				<div className='flex flex-col gap-4 h-full animate-translateRight'>
					<TableTopic onChangePaging={props.onChangePaging} isLoading={props.isLoading} data={props.data.list} total={props.data.total} />
				</div>
			</Wrapper>
		</div>
	);
}

export default View;
