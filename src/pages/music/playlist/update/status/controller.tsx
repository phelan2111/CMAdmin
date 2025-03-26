import { Component } from 'react';
import View from './view';
import { UpdateStatusProps } from '.';
import { EnumStatusPlaylist, EnumStatusSong } from '@/utils/enums';
import { PayloadUploadStatusPlaylist } from '@/services/music/playlist/updateStatus';
import { initialPlaylistDetails, ResponsePlaylistDetails } from '@/services/music/playlist/details';

type ControllerState = {
	allState: {
		details: ResponsePlaylistDetails;
	};
};

interface ControllerProps extends UpdateStatusProps {
	onUpdateStatusPlayList: (dataItem: PayloadUploadStatusPlaylist) => void;
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

	handleSubmit() {
		const isActiveStatus = this.props.details.status === EnumStatusSong.display;
		if (isActiveStatus) {
			this.props.onUpdateStatusPlayList({
				status: EnumStatusPlaylist.hidden,
				playlistId: this.state.allState.details.playlistId,
			});
		} else {
			this.props.onUpdateStatusPlayList({
				status: EnumStatusPlaylist.display,
				playlistId: this.state.allState.details.playlistId,
			});
		}
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
