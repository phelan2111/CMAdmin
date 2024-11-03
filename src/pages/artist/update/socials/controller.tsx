import { Component } from 'react';
import View from './view';
import { UpdateInformationProps } from '.';
import { PayloadUpdateInformationArtist } from '@/services/artist/updateInformation';
import { initialArtistDetails, ResponseGetArtistDetails } from '@/services/artist/getDetails';
import { DataFormUpdateSocials } from '../../types';

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

	handleSubmit(dataItem: DataFormUpdateSocials) {
		const payload: PayloadUpdateInformationArtist = {
			genres: this.props.details.genres,
			singerAvatar: this.props.details.singerAvatar,
			singerCover: this.props.details.singerCover,
			singerId: this.props.details.singerId,
			singerDescription: this.props.details.singerDescription,
			singerName: this.props.details.singerName,
			socials: dataItem,
		};
		this.props.onUpdateArtist(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
