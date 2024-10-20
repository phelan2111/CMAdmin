import { Role } from './enums';

export const parseEnumRole: Record<Role, string> = {
	[Role.admin]: 'Admin',
	[Role.user]: 'User',
};
