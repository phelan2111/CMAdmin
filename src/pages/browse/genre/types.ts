import { ItemSelect } from '@/components/root/inputs/select';
import { DataUpload } from '@/components/root/upload/normal';
import { ReactNode } from 'react';

export type FucCreateGenreProps = {
	renderComponent: ReactNode;
};

export type DataFormCreate = {
	topicName: string;
};

export type FromStateCreateGenre = {
	genreName: string;
	imageGenre: DataUpload[];
	topic: ItemSelect;
};
