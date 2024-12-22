import { Component } from 'react';
import View from './view';
import { UpdateInformationProps } from '.';
import { DataFormUpdateIntro } from '../../types';
import { initialSongDetails, ResponseGetSongDetails } from '@/services/music/song/getDetails';
import { PayloadUpdateInformationSong } from '@/services/music/song/updateInformation';

type ControllerState = {
	allState: {
		details: ResponseGetSongDetails;
	};
};

interface ControllerProps extends UpdateInformationProps {
	onUpdateSong: (dataItem: PayloadUpdateInformationSong) => void;
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

	handleSubmit(dataItem: DataFormUpdateIntro) {
		const { details, onUpdateSong } = this.props;

		const payload: PayloadUpdateInformationSong = {
			image: details.image,
			link: details.link,
			singers: details.singer,
			songId: details.songId,
			type: details.type,
			...dataItem,
		};
		onUpdateSong(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
