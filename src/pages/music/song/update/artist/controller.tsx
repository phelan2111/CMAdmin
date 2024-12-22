import { Component } from 'react';
import View from './view';
import { UpdateInformationProps } from '.';
import { initialSongDetails, ResponseGetSongDetails, Singer } from '@/services/music/song/getDetails';
import { PayloadUpdateInformationSong } from '@/services/music/song/updateInformation';
import { ResponseGetListArtist } from '@/services/music/artist/getSinger';

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

	handleSubmit(dataItem: ResponseGetListArtist[]) {
		const { details, onUpdateSong } = this.props;

		const singers: Singer[] = dataItem.map((i) => ({
			...i,
			singerId: i._id,
			socials: i.socials,
		}));
		const payload: PayloadUpdateInformationSong = {
			image: details.image,
			link: details.link,
			songDescription: details.songDescription,
			songId: details.songId,
			songName: details.songName,
			type: details.type,
			singers,
		};

		onUpdateSong(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
