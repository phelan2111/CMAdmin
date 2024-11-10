import { IItemBreadcrumb } from '@/components/root/breadcrumb/normal';
import { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import { EnumStatusAccount } from '@/utils/enums';
import { Helper } from '@/utils/helper';

export const dataFilterArtist: FilterStatusItem[] = [
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
