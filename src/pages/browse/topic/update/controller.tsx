import { Component } from 'react';
import View from './view';
import { UpdateStatusProps } from '.';
import { ResponseGetTopicDetailsOfBrowse } from '@/services/browse/topic/getDetails';
import { initialStateItemTopic } from '../../variables';
import { PayloadTopicUpdateStatus } from '@/services/browse/topic/updateStatus';
import { EnumStatusBrowse } from '@/utils/enums';

type ControllerState = {
	allState: {
		details: ResponseGetTopicDetailsOfBrowse;
	};
};

interface ControllerProps extends UpdateStatusProps {
	onUpdateStatus: (dataItem: PayloadTopicUpdateStatus) => void;
}

export default class Controller extends Component<ControllerProps, ControllerState> {
	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				details: initialStateItemTopic,
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
				topicId: this.state.allState.details._id,
			});
		} else {
			this.props.onUpdateStatus({
				status: EnumStatusBrowse.hidden,
				topicId: this.state.allState.details._id,
			});
		}
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
