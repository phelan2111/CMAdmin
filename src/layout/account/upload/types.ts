import { DataUpload } from '@/components/root/upload/normal';

export type UploadAccountProps = {
	src?: string;
	onChange?: (dataItem: DataUpload) => void;
	name?: string;
};

export type UploadCarouselProps = {
	src?: string[];
	onChange?: (dataItem: DataUpload[]) => void;
	name?: string;
};
