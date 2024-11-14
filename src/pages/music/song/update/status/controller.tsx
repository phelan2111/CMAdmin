import { Component } from 'react';
import View from './view';
import { UpdateStatusProps } from '.';
import { EnumStatusSong } from '@/utils/enums';
import { PayloadSongUpdateStatus } from '@/services/music/song/updateStatus';
import { initialSongDetails, ResponseGetSongDetails } from '@/services/music/song/getDetails';

type ControllerState = {
	allState: {
		details: ResponseGetSongDetails;
	};
};

interface ControllerProps extends UpdateStatusProps {
	onUpdateStatusSong: (dataItem: PayloadSongUpdateStatus) => void;
}

export default class Controller extends Component<ControllerProps, ControllerState> {
	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				details: initialSongDetails,
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
			this.props.onUpdateStatusSong({
				status: EnumStatusSong.hidden,
				songId: this.state.allState.details.songId,
			});
		} else {
			this.props.onUpdateStatusSong({
				status: EnumStatusSong.display,
				songId: this.state.allState.details.songId,
			});
		}
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
