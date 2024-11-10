import { GenresOfArtist } from '@/services/music/artist/getDetails';
import { ResponseGetGenreOfBrowse } from '@/services/browse/genre/getList';

export type DataFormCreateSinger = {
	singerDescription: string;
	singerCover: Upload[];
	singerAvatar: Upload;
	singerName: string;
	facebook: string;
	instagram: string;
	genres: ResponseGetGenreOfBrowse[];
};

export type Upload = {
	src: string;
	uploadId: string;
};

export type DataFormUpdateIntro = {
	singerName: string;
	singerDescription: string;
};

export type DataFormUpdateSocials = {
	facebook?: string;
	instagram?: string;
};

export type DataFormUpdateGenres = {
	genres: GenresOfArtist[];
};
