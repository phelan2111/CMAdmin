import { Component } from 'react';
import View from './view';
import { UpdateStatusProps } from '.';
import { initialPlaylistDetails, ResponsePlaylistDetails } from '@/services/music/playlist/details';
import { FormUpdateSongs } from '../../types';
import { PayloadUploadPlaylist } from '@/services/music/playlist/update';

type ControllerState = {
	allState: {
		details: ResponsePlaylistDetails;
	};
};

interface ControllerProps extends UpdateStatusProps {
	onUpdatePlayList: (dataItem: PayloadUploadPlaylist) => void;
}

export default class Controller extends Component<ControllerProps, ControllerState> {
	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				details: initialPlaylistDetails,
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(): void {
		const { allState } = this.state;
		allState.details = this.props.details;
		this.setState({ allState });
	}

	handleSubmit(dataItem: FormUpdateSongs) {
		const { allState } = this.state;
		const payload: PayloadUploadPlaylist = {
			playlistId: allState.details.playlistId,
			image: allState.details.image,
			songs: dataItem.songs.map((i) => i.songId),
			descriptionPlaylist: allState.details.descriptionPlaylist,
			namePlaylist: allState.details.namePlaylist,
			theme: allState.details.theme,
		};
		this.props.onUpdatePlayList(payload);
	}

	render() {
		return <View {...this.props} onSubmit={this.handleSubmit} />;
	}
}
