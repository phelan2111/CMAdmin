import { ItemRadio } from '@/components/root/inputs/radio';
import { ReactNode } from 'react';

export type FucCreateAccountProps = {
	renderComponent: ReactNode;
};

export type DataFormUpdate = {
	lastName: string;
	firstName: string;
	gender?: ItemRadio;
	email: string;
	address: string;
};
