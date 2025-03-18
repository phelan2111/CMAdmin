export type FormCreatePlayList = {
	namePlaylist: string;
	descriptionPlaylist: string;
	theme: string;
	image: Image;
	songList: SongList;
};

export interface Image {
	src: string;
	uploadId: string;
}

export interface SongList {
	value: Value[];
}

export interface Value {
	songName: string;
	image: string;
	songDescription: string;
	link: string;
	views: number;
	status: number;
	songId: string;
	createdAt: Date;
	updatedAt: Date;
	type: number;
	singers: Singer[];
}

export interface Singer {
	singerId: string;
	singerName: string;
	singerAvatar: string;
	singerCover: string[];
	singerDescription: string;
	followers: number;
	socials: Socials;
	status: number;
	_id: string;
}

export interface Socials {
	facebook: string;
	instagram: string;
}
