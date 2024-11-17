import { ResponseGetListArtist } from '@/services/music/artist/getSinger';
import { SingerOfSong } from '@/services/music/song/create';
import { TypeFileSetUpSong } from '@/utils/enums';

export type DataFormCreateSong = {
	songDescription: string;
	image: Upload;
	setup: {
		type: TypeFileSetUpSong;
		uploadData: Upload;
	};
	songName: string;
	singers: ResponseGetListArtist[];
};

export type Upload = {
	src: string;
	uploadId: string;
};

export type DataFormUpdateIntro = {
	songName: string;
	songDescription: string;
};

export type DataFormUpdateSocials = {
	facebook?: string;
	instagram?: string;
};

export type DataFormUpdateArtist = {
	singer: SingerOfSong[];
};
