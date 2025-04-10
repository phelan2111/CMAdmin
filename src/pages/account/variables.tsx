import { IItemBreadcrumb } from '@/components/root/breadcrumb/normal';
import { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import { ResponseGetUserDetails } from '@/services/user/getDetails';
import { EnumStatusAccount, Role } from '@/utils/enums';
import { Helper } from '@/utils/helper';

export const dataFilterAccount: FilterStatusItem[] = [
	{
		id: Helper.randomKey(),
		text: 'INACTIVE',
		value: EnumStatusAccount.inactive,
		className: 'bg-gray-500',
	},
	{
		id: Helper.randomKey(),
		text: 'ACTIVE',
		value: EnumStatusAccount.active,
		className: 'bg-green-500',
	},
	{
		id: Helper.randomKey(),
		text: 'LOCK',
		value: EnumStatusAccount.lock,
		className: 'bg-red-500',
	},
];

export const initialUserDetails: ResponseGetUserDetails = {
	createdAt: '',
	email: '',
	firstName: '',
	lastName: '',
	role: Role.admin,
	status: EnumStatusAccount.active,
	updatedAt: '',
	userId: '',
};

export const initialStateItemUser: ResponseGetUserDetails = {
	createdAt: '',
	updatedAt: '',
	email: '',
	firstName: '',
	lastName: '',
	role: Role.admin,
	status: EnumStatusAccount.active,
	userId: '',
};

export const breadcrumbCreateAccount: IItemBreadcrumb[] = [
	{
		id: Helper.randomKey(),
		text: 'Account',
		hasPrev: true,
	},
	{
		id: Helper.randomKey(),
		text: 'Create Account',
	},
];
