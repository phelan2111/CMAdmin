import Grid from '@/components/root/grid/normal';
import { GridColumn, TableProps } from '@/components/root/grid/types';
import Avatar from '@/components/root/image/avatar';
import StatusAccount from '@/components/ui/status/account';
import { ResponseGetUser } from '@/services/user/getList';
import { parseEnumRole } from '@/utils/prase';
import dayjs from 'dayjs';

const gridColumTableAccount: GridColumn<ResponseGetUser>[] = [
	{
		title: 'STATUS',
		field: 'status',
		cell: ({ dataItem }) => {
			return <StatusAccount status={dataItem.status} />;
		},
	},
	{
		title: 'USER_ID',
		field: '_id',
	},
	{
		title: 'USERNAME',
		field: 'email',
	},
	{
		title: 'ASSIGNED_TO',
		field: 'assignedTo',
		cell: ({ dataItem }) => {
			return (
				<div className='flex gap-2 items-center'>
					<Avatar className='h-10 w-10' src={dataItem.avatar} />
					<p>
						{dataItem.lastName} {dataItem.firstName}
					</p>
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
	{
		title: 'ROLE',
		field: 'ro',
		cell: ({ dataItem }) => {
			return (
				<div className='font-semibold'>
					<p className='text-lg'>{parseEnumRole[dataItem.role]}</p>
				</div>
			);
		},
	},
];

function TableAccount(props: TableProps<ResponseGetUser>) {
	return <Grid {...props} gridColum={gridColumTableAccount} />;
}

export default TableAccount;
