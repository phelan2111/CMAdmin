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
import SearchTool from '@/components/ui/common/tool/search/normal';
import { dataFilter } from 'pages/browse/variables';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';

type ViewProps = {
	isLoading: boolean;
	data: ResponseRequest<ResponseGetTopicOfBrowse>;
	onCreateTopic: (renderProps: FucCreateTopicProps) => void;
	onChangePaging?: (dataPaging: PagingState) => void;
	onChangeSearch: (dataItem: string) => void;
	onChangeFilterStatus: (dataItem: FilterStatusItem) => void;
	onRefreshRequest: VoidFunction;
};

function View(props: ViewProps) {
	const { redirectPage } = useRedirect();

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
									renderComponent: <CreateTopic onRefreshRequest={props.onRefreshRequest} />,
								});
							}}
							className='!bg-white/80 w-full text-primary_dark !rounded-md hover:!bg-white/50'>
							{Localize('CREATE_TOPIC')}
						</Button>
					</div>
				</div>
				<div className='rounded-xl px-3 py-3 flex items-center justify-between animate-translateRight'>
					<FilterStatusTool onChange={props.onChangeFilterStatus} data={dataFilter} />
					<SearchTool onChange={props.onChangeSearch} />
				</div>
				<div className='flex flex-col gap-4 h-full animate-translateRight'>
					<TableTopic
						isLoading={props.isLoading}
						data={props.data.list}
						total={props.data.total}
						onChangePaging={props.onChangePaging}
						onClickRow={(dataItem) => {
							redirectPage(`${PATH.BROWSE.TOPIC._}/${dataItem._id}`);
						}}
					/>
				</div>
			</Wrapper>
		</div>
	);
}

export default View;
