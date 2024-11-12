import { Component } from 'react';
import View from './view';
import { DataFormCreateSong } from '../types';
import { PayloadCreateSong, SingerOfSong } from '@/services/music/song/create';
type ControllerProps = {
	onCreateSong: (dataItem: PayloadCreateSong) => void;
};

export default class Controller extends Component<ControllerProps> {
	constructor(props: ControllerProps) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(dataItem: DataFormCreateSong) {
		const singers: SingerOfSong[] = dataItem.singers.map((i) => ({
			followers: i.followers,
			singerAvatar: i.singerAvatar,
			singerCover: i.singerCover,
			singerDescription: i.singerDescription,
			singerId: i._id,
			singerName: i.singerName,
			socials: i.socials,
			status: i.status,
		}));
		const payload: PayloadCreateSong = {
			image: dataItem.image.src,
			link: dataItem.setup.uploadData.src,
			songDescription: dataItem.songDescription,
			songName: dataItem.songName,
			singers,
		};
		this.props.onCreateSong(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} />;
	}
}
