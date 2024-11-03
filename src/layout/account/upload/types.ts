import { DataUpload } from '@/components/root/upload/normal';

export type UploadAvatarProps = {
	src?: string;
	onChange?: (dataItem: DataUpload) => void;
	name?: string;
	isDetails?: boolean;
};

export type UploadCarouselProps = {
	src?: string[];
	onChange?: (dataItem: DataUpload[]) => void;
	name?: string;
	isDetails?: boolean;
};
