import { ItemSelect } from '@/components/root/inputs/select';
import { parseEnumRole, parseGender } from './prase';
import { Gender, Role } from './enums';
import { ItemRadio } from '@/components/root/inputs/radio';
import { Helper } from './helper';

export const LIMIT = 5;
export const FROM = 0;
export const SORT = {
	DESC: 'desc',
	ASC: 'asc',
};
export const initialSelectRole: ItemSelect[] = [
	{
		label: parseEnumRole[Role.admin],
		value: Role.admin,
	},
	{
		label: parseEnumRole[Role.user],
		value: Role.user,
	},
];

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
