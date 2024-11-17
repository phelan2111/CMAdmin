import { Component } from 'react';
import View from './view';
import { UpdateInformationProps } from '.';
import { DataFormUpdateArtist } from '../../types';
import { initialSongDetails, ResponseGetSongDetails } from '@/services/music/song/getDetails';
import { PayloadUpdateInformationSong } from '@/services/music/song/updateInformation';
import { SingerOfSong } from '@/services/music/song/create';

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

	handleSubmit(dataItem: DataFormUpdateArtist) {
		const { details } = this.state.allState;
		const singers: SingerOfSong[] = dataItem.singer;
		const payload: PayloadUpdateInformationSong = {
			image: details.image,
			link: details.link,
			songId: details.songId,
			songDescription: details.songDescription,
			songName: details.songName,
			singers,
		};
		this.props.onUpdateSong(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
