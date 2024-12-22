import { DataUpload } from '@/components/root/upload/normal';
import { ItemUploadMedia } from '@/components/ui/upload/types';

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

export type UploadMediaProps = {
	onChange?: (dataItem: DataUpload) => void;
	name?: string;
	isDetails?: boolean;
	defaultValue?: ItemUploadMedia
};