import { Component } from 'react';
import View from './view';
import { PayloadCreatePlaylist } from '@/services/music/playlist/create';
import { FormCreatePlayList } from '../types';

type ControllerProps = {
	onCreate: (payload: PayloadCreatePlaylist) => void;
};

export default class Controller extends Component<ControllerProps> {
	constructor(props: ControllerProps) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(dataForm: FormCreatePlayList) {
		const payload: PayloadCreatePlaylist = {
			descriptionPlaylist: dataForm.descriptionPlaylist,
			image: dataForm.image.src,
			namePlaylist: dataForm.namePlaylist,
			songs: dataForm.songs.map((i) => i.songId),
			theme: dataForm.theme,
		};
		this.props.onCreate(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} />;
	}
}
