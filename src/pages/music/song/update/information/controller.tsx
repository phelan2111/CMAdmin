import { Component } from 'react';
import View from './view';
import { UpdateInformationProps } from '.';
import { DataFormUpdateIntro } from '../../types';
import { initialArtistDetails, ResponseGetArtistDetails } from '@/services/music/artist/getDetails';
import { PayloadUpdateInformationArtist } from '@/services/music/artist/updateInformation';

type ControllerState = {
	allState: {
		details: ResponseGetArtistDetails;
	};
};

interface ControllerProps extends UpdateInformationProps {
	onUpdateArtist: (dataItem: PayloadUpdateInformationArtist) => void;
}

export default class Controller extends Component<ControllerProps, ControllerState> {
	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				details: initialArtistDetails,
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
		const payload: PayloadUpdateInformationArtist = {
			genres: this.props.details.genres,
			singerAvatar: this.props.details.singerAvatar,
			singerCover: this.props.details.singerCover,
			singerId: this.props.details.singerId,
			...dataItem,
		};
		this.props.onUpdateArtist(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
