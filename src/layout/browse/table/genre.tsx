import Grid from '@/components/root/grid/normal';
import { GridColumn } from '@/components/root/grid/types';
import Avatar from '@/components/root/image/avatar';
import StatusBrowse from '@/components/ui/status/browse';
import { ResponseGetGenreOfBrowse } from '@/services/browse/genre/getList';
import dayjs from 'dayjs';

const gridColumTableGenre: GridColumn<ResponseGetGenreOfBrowse>[] = [
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
					<Avatar className='h-10 w-10 rounded-md' src={dataItem.imageGenre} />
					<p>{dataItem.nameGenre}</p>
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

type TableGenreProps = {
	total: number;
	data: ResponseGetGenreOfBrowse[];
	isLoading?: boolean;
};

function TableGenre(props: TableGenreProps) {
	return <Grid isLoading={props.isLoading} total={props.total} data={props.data} gridColum={gridColumTableGenre} />;
}

export default TableGenre;
