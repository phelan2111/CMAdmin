export type FormCreatePlayList = {
	namePlaylist: string;
	descriptionPlaylist: string;
	theme: string;
	image: Image;
	songs: ItemSong[];
};

export type FormUpdateInformation = {
	descriptionPlaylist: string;
	namePlaylist: string;
	theme: string;
};

export interface Image {
	src: string;
	uploadId: string;
}

export interface ItemSong {
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


export type FormUpdateSongs = {
	songs: ItemSongFormUpdate[];
};

export type ItemSongFormUpdate = {
	songName: string;
	image: string;
	songDescription: string;
	link: string;
	views: number;
	status: number;
	songId: string;
	type: number;
	singers: ItemSingerFormUpdate[];
};

export type ItemSingerFormUpdate = {
	singerName: string;
	singerAvatar: string;
	singerId: string;
	status: number;
	followers: number;
};