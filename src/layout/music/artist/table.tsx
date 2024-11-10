import Grid from '@/components/root/grid/normal';
import { GridColumn, TableProps } from '@/components/root/grid/types';
import Avatar from '@/components/root/image/avatar';
import StatusArtist from '@/components/ui/status/artist';
import { ResponseGetListArtist } from '@/services/music/artist/getSinger';
import dayjs from 'dayjs';

const gridColumTableArtist: GridColumn<ResponseGetListArtist>[] = [
	{
		title: 'STATUS',
		field: 'status',
		cell: ({ dataItem }) => {
			return <StatusArtist status={dataItem.status} />;
		},
	},
	{
		title: 'ARTIST_ID',
		field: '_id',
	},
	{
		title: 'ASSIGNED_TO',
		field: 'assignedTo',
		cell: ({ dataItem }) => {
			return (
				<div className='flex gap-2 items-center'>
					<Avatar className='h-10 w-10' src={dataItem.singerAvatar} />
					<p>{dataItem.singerName}</p>
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
		title: 'FOLLOWERS',
		field: 'followers',
		cell: ({ dataItem }) => {
			return (
				<div className='font-semibold'>
					<p className='text-sm'>{dataItem.followers} followers</p>
				</div>
			);
		},
	},
];

function TableArtist(props: TableProps<ResponseGetListArtist>) {
	return <Grid gridColum={gridColumTableArtist} {...props} />;
}

export default TableArtist;
