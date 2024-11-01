import { ItemRadio } from '@/components/root/inputs/radio';
import { ItemSelect } from '@/components/root/inputs/select';
import { DataUpload } from '@/components/root/upload/normal';
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

export type DataFormCreate = {
	lastName: string;
	firstName: string;
	gender: ItemRadio;
	email: string;
	address?: string;
	role: ItemSelect;
	cover: DataUpload;
	avatar: DataUpload;
};