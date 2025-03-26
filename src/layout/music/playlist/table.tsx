import Grid from '@/components/root/grid/normal';
import { GridColumn, TableProps } from '@/components/root/grid/types';
import Avatar from '@/components/root/image/avatar';
import StatusPlaylist from '@/components/ui/status/playlist';
import { ResponsePlaylist } from '@/services/music/playlist/getPlaylist';
import dayjs from 'dayjs';

const gridColumTablePlaylist: GridColumn<ResponsePlaylist>[] = [
	{
		title: 'STATUS',
		field: 'status',
		cell: ({ dataItem }) => {
			return <StatusPlaylist status={dataItem.status} />;
		},
	},
	{
		title: 'NAME_PLAYLIST',
		field: 'name',
		cell: ({ dataItem }) => {
			return (
				<div className='flex gap-2 items-center'>
					<Avatar className='h-10 w-10' src={dataItem.image} />
					<div>
						<p>{dataItem.namePlaylist}</p>
						<p className='text-sm font-light line-clamp-1 max-w-96'>{dataItem.descriptionPlaylist}</p>
					</div>
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
		title: 'VIEW_SAVED',
		field: 'followers',
		cell: ({ dataItem }) => {
			return (
				<div className='font-semibold'>
					<p className='text-sm'>{dataItem.viewSaves} views</p>
				</div>
			);
		},
	},
];

function TablePlaylist(props: TableProps<ResponsePlaylist>) {
	return <Grid gridColum={gridColumTablePlaylist} {...props} />;
}

export default TablePlaylist;
