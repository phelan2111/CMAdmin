import { Component } from 'react';
import View from './view';
import { UpdateInformationProps } from '.';
import { initialSongDetails, ResponseGetSongDetails } from '@/services/music/song/getDetails';
import { PayloadUpdateInformationSong } from '@/services/music/song/updateInformation';
import { FromUpdateSetUp } from '@/components/ui/upload/types';

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

	handleSubmit(dataItem: FromUpdateSetUp) {
		const { details, onUpdateSong } = this.props;
		const payload: PayloadUpdateInformationSong = {
			type: dataItem.setup.type,
			link: dataItem.setup.uploadData.src,
			image: details.image,
			singers: details.singer,
			songDescription: details.songDescription,
			songId: details.songId,
			songName: details.songName,
		};

		onUpdateSong(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
