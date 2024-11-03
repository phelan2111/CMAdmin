import { Component } from 'react';
import View from './view';
import { UpdateStatusProps } from '.';
import { EnumStatusArtist } from '@/utils/enums';
import { initialArtistDetails, ResponseGetArtistDetails } from '@/services/artist/getDetails';
import { PayloadArtistUpdateStatus } from '@/services/artist/updateStatus';

type ControllerState = {
	allState: {
		details: ResponseGetArtistDetails;
	};
};

interface ControllerProps extends UpdateStatusProps {
	onUpdateStatusSinger: (dataItem: PayloadArtistUpdateStatus) => void;
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

	handleSubmit() {
		const isActiveStatus = this.props.details.status === EnumStatusArtist.active;
		if (isActiveStatus) {
			this.props.onUpdateStatusSinger({
				status: EnumStatusArtist.lock,
				singerId: this.state.allState.details.singerId,
			});
		} else {
			this.props.onUpdateStatusSinger({
				status: EnumStatusArtist.active,
				singerId: this.state.allState.details.singerId,
			});
		}
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
