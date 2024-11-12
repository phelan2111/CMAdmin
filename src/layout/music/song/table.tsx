import Grid from '@/components/root/grid/normal';
import { GridColumn, TableProps } from '@/components/root/grid/types';
import Avatar from '@/components/root/image/avatar';
import StatusSong from '@/components/ui/status/song';
import { ResponseGetListSong } from '@/services/music/song/getSong';
import dayjs from 'dayjs';

const gridColumTableSong: GridColumn<ResponseGetListSong>[] = [
	{
		title: 'STATUS',
		field: 'status',
		cell: ({ dataItem }) => {
			return <StatusSong status={dataItem.status} />;
		},
	},
	{
		title: 'SONG_ID',
		field: 'songId',
	},
	{
		title: 'SONG',
		field: 'song',
		cell: ({ dataItem }) => {
			return (
				<div className='flex gap-2 items-center'>
					<Avatar className='h-10 w-10' src={dataItem.image} />
					<p>{dataItem.songName}</p>
				</div>
			);
		},
	},
	{
		title: 'CREATE_AT',
		field: 'createAt',
		cell: ({ dataItem }) => {
			return (
				<div className='font-semibold'>
					<p className='text-lg'>{dayjs(dataItem.createdAt).format('DD.MM.YYYY')}</p>
					<p className='text-sm'>{dayjs(dataItem.createdAt).format('hh:mm:ss')}</p>
				</div>
			);
		},
	},
	{
		title: 'UPDATE_AT',
		field: 'updateAt',
		cell: ({ dataItem }) => {
			return (
				<div className='font-semibold'>
					<p className='text-lg'>{dayjs(dataItem.updatedAt).format('DD.MM.YYYY')}</p>
					<p className='text-sm'>{dayjs(dataItem.updatedAt).format('hh:mm:ss')}</p>
				</div>
			);
		},
	},
	{
		title: 'VIEW',
		field: 'views',
		cell: ({ dataItem }) => {
			return (
				<div className='font-semibold'>
					<p className='text-sm'>{dataItem.views} Views</p>
				</div>
			);
		},
	},
];

function TableSong(props: TableProps<ResponseGetListSong>) {
	return <Grid gridColum={gridColumTableSong} {...props} />;
}

export default TableSong;
