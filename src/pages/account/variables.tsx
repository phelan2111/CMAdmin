import { ItemRadio } from '@/components/root/inputs/radio';
import { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import { ResponseGetUserDetails } from '@/services/user/getDetails';
import { EnumStatusAccount, Gender, Role } from '@/utils/enums';
import { Helper } from '@/utils/helper';
import { parseGender } from '@/utils/prase';

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

export const genderRadio: ItemRadio[] = [
	{
		value: Gender.female,
		id: Helper.randomKey(),
		label: parseGender[Gender.female],
	},
	{
		value: Gender.male,
		id: Helper.randomKey(),
		label: parseGender[Gender.male],
	},
];
