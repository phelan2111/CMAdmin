import { Component } from 'react';
import View from './view';
import { UpdateStatusProps } from '.';
import { initialPlaylistDetails, ResponsePlaylistDetails } from '@/services/music/playlist/details';
import { FormUpdateInformation } from '../../types';
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

	handleSubmit(dataItem: FormUpdateInformation) {
		const { allState } = this.state;
		const payload: PayloadUploadPlaylist = {
			...dataItem,
			playlistId: allState.details.playlistId,
			image: allState.details.image,
			songs: allState.details.songs.map((i) => i.songId),
		};
		this.props.onUpdatePlayList(payload);
	}

	render() {
		return <View {...this.props} onSubmit={this.handleSubmit} />;
	}
}
