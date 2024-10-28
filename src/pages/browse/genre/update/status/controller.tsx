import { Component } from 'react';
import View from './view';
import { UpdateStatusProps } from '.';
import { initialStateItemGenre } from '../../../variables';
import { EnumStatusBrowse } from '@/utils/enums';
import { ResponseGetGenreDetailsOfBrowse } from '@/services/browse/genre/getDetails';
import { PayloadGenreUpdateStatus } from '@/services/browse/genre/updateStatus';

type ControllerState = {
	allState: {
		details: ResponseGetGenreDetailsOfBrowse;
	};
};

interface ControllerProps extends UpdateStatusProps {
	onUpdateStatus: (dataItem: PayloadGenreUpdateStatus) => void;
}

export default class Controller extends Component<ControllerProps, ControllerState> {
	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				details: initialStateItemGenre,
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
		const isHiddenStatus = this.props.details.status === EnumStatusBrowse.hidden;
		if (isHiddenStatus) {
			this.props.onUpdateStatus({
				status: EnumStatusBrowse.display,
				genreId: this.state.allState.details.genreId,
			});
		} else {
			this.props.onUpdateStatus({
				status: EnumStatusBrowse.hidden,
				genreId: this.state.allState.details.genreId,
			});
		}
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
