import { IItemBreadcrumb } from '@/components/root/breadcrumb/normal';
import { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import { EnumStatusPlaylist } from '@/utils/enums';
import { Helper } from '@/utils/helper';

export const dataFilterPlaylist: FilterStatusItem[] = [
	{
		id: Helper.randomKey(),
		text: 'DISPLAY',
		value: EnumStatusPlaylist.display,
		className: 'bg-green-500',
	},
	{
		id: Helper.randomKey(),
		text: 'HIDDEN',
		value: EnumStatusPlaylist.hidden,
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
