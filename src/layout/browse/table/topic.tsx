import Grid from '@/components/root/grid/normal';
import { GridColumn, PagingState } from '@/components/root/grid/types';
import StatusBrowse from '@/components/ui/status/browse';
import { ResponseGetTopicOfBrowse } from '@/services/browse/topic/getList';
import dayjs from 'dayjs';

const gridColumTableTopic: GridColumn<ResponseGetTopicOfBrowse>[] = [
	{
		title: 'STATUS',
		field: 'status',
		cell: ({ dataItem }) => {
			return <StatusBrowse status={dataItem.status} />;
		},
	},
	{
		title: 'TOPIC_ID',
		field: '_id',
	},
	{
		title: 'TOPIC_NAME',
		field: 'topicName',
	},
	{
		title: 'DATE',
		field: 'date',
		cell: ({ dataItem }) => {
			return (
				<div className='font-semibold'>
					<p className='text-lg'>{dayjs(dataItem.createdAt).format('DD.MM.YYYY')}</p>
					<p className='text-sm'>{dayjs(dataItem.createdAt).format('hh:mm:ss')}</p>
				</div>
			);
		},
	},
];

type TableTopicProps = {
	total: number;
	data: ResponseGetTopicOfBrowse[];
	isLoading?: boolean;
	onChangePaging?: (dataPaging: PagingState) => void;
	onClickRow: (dataItem: ResponseGetTopicOfBrowse) => void;
};

function TableTopic(props: TableTopicProps) {
	return (
		<Grid
			onClickRow={props.onClickRow}
			onChangePaging={props.onChangePaging}
			isLoading={props.isLoading}
			total={props.total}
			data={props.data}
			gridColum={gridColumTableTopic}
		/>
	);
}

export default TableTopic;
