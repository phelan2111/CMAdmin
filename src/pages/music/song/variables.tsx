import { IItemBreadcrumb } from '@/components/root/breadcrumb/normal';
import { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import { EnumStatusSong } from '@/utils/enums';
import { Helper } from '@/utils/helper';

export const dataFilterSong: FilterStatusItem[] = [
	{
		id: Helper.randomKey(),
		text: 'DISPLAY',
		value: EnumStatusSong.display,
		className: 'bg-green-500',
	},
	{
		id: Helper.randomKey(),
		text: 'HIDDEN',
		value: EnumStatusSong.hidden,
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
