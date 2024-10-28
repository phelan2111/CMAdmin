import { Component } from 'react';
import View from './view';
import { ResponseGetTopicDetailsOfBrowse } from '@/services/browse/topic/getDetails';
import { initialStateItemTopic } from '../../../variables';
import { UpdateInformationProps } from '.';
import { DataFormTopic } from '../../types';
import { PayloadTopicUpdateInformation } from '@/services/browse/topic/updateInformation';

type ControllerState = {
	allState: {
		details: ResponseGetTopicDetailsOfBrowse;
	};
};

interface ControllerProps extends UpdateInformationProps {
	onUpdateInformation: (dataItem: PayloadTopicUpdateInformation) => void;
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

	handleSubmit(dataItem: DataFormTopic) {
		const { onUpdateInformation } = this.props;
		onUpdateInformation({
			topicId: this.props.details.topicId,
			topicName: dataItem.topicName,
		});
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
