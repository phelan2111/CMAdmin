import Grid from '@/components/root/grid/normal';
import { GridColumn } from '@/components/root/grid/types';
import Avatar from '@/components/root/image/avatar';
import StatusBrowse from '@/components/ui/status/browse';
import { ResponseGetBrowse } from '@/services/browse/getList';
import dayjs from 'dayjs';

const gridColumTableBrowse: GridColumn<ResponseGetBrowse>[] = [
	{
		title: 'STATUS',
		field: 'status',
		cell: ({ dataItem }) => {
			return <StatusBrowse status={dataItem.status} />;
		},
	},
	{
		title: 'BROWSE_ID',
		field: '_id',
	},
	{
		title: 'INFORMATION_BROWSE',
		field: 'nameBrowse',
		cell: ({ dataItem }) => {
			return (
				<div className='flex gap-2 items-center'>
					<Avatar className='h-10 w-10 rounded-md' src={dataItem.imageBrowse} />
					<p>{dataItem.nameBrowse}</p>
				</div>
			);
		},
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

type TableBrowseProps = {
	total: number;
	data: ResponseGetBrowse[];
	isLoading?: boolean;
};

function TableBrowse(props: TableBrowseProps) {
	return <Grid isLoading={props.isLoading} total={props.total} data={props.data} gridColum={gridColumTableBrowse} />;
}

export default TableBrowse;
