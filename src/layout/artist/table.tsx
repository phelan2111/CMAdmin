import Grid from '@/components/root/grid/normal';
import { GridColumn } from '@/components/root/grid/types';
import Avatar from '@/components/root/image/avatar';
import StatusAccount from '@/components/ui/status/account';
import data from '@/pages/account/list/data.json';
import dayjs from 'dayjs';

const gridColumTableArtist: GridColumn<IDataFake>[] = [
	{
		title: 'STATUS',
		field: 'status',
		cell: ({ dataItem }) => {
			return <StatusAccount status={dataItem.status} />;
		},
	},
	{
		title: 'CLIENT',
		field: 'client',
	},
	{
		title: 'ASSIGNED_TO',
		field: 'assignedTo',
		cell: ({ dataItem }) => {
			return (
				<div className='flex gap-2 items-center'>
					<Avatar className='h-10 w-10' src={dataItem.avatar} />
					<p>{dataItem.assignedTo}</p>
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
					<p className='text-lg'>{dayjs(dataItem.date).format('DD.MM.YYYY')}</p>
					<p className='text-sm'>{dayjs(dataItem.date).format('hh:mm:ss')}</p>
				</div>
			);
		},
	},
	{
		title: 'RO',
		field: 'ro',
	},
	{
		title: 'CLAIM_NUMBER',
		field: 'claimNumber',
	},
	{
		title: 'AMOUNT',
		field: 'amount',
	},
];

type IDataFake = {
	status: number;
	client: string;
	assignedTo: string;
	date: number;
	ro: string;
	claimNumber: string;
	amount: number;
	avatar: string;
};

function TableArtist() {
	return <Grid total={16} data={data} gridColum={gridColumTableArtist} />;
}

export default TableArtist;
