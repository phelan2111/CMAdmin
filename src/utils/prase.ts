import { Gender, Role } from './enums';

export const parseEnumRole: Record<Role, string> = {
	[Role.admin]: 'Admin',
	[Role.user]: 'User',
};

export const parseGender: Record<Gender, string> = {
	[Gender.female]: 'FEMALE',
	[Gender.male]: 'MALE',
};
