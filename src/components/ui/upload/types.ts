import { DataUpload } from '@/components/root/upload/normal';
import { TypeFileSetUpSong } from '@/utils/enums';

export type UploadAvatarProps = {
	src?: string;
	onChange?: (dataItem: DataUpload) => void;
	name?: string;
	isDetails?: boolean;
	className?: string;
	multi?: boolean;
};

export type UploadCarouselProps = {
	src?: string[];
	onChange?: (dataItem: DataUpload[]) => void;
	name?: string;
	isDetails?: boolean;
};

export type UploadMediaProps = {
	src?: string;
	onChange?: (dataItem: DataUpload) => void;
	name?: string;
	isDetails?: boolean;
};

export type ItemUploadMedia = {
	uploadData: DataUpload,
	type: TypeFileSetUpSong
}

export type FromUpdateSetUp = {
	setup: ItemUploadMedia
}