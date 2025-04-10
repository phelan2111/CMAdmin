import { Component, memo } from 'react';
import View from './view';
import { DataFormTopic } from '../types';
import { PayloadCreateTopic } from '@/services/browse/topic/create';

type PropsController = {
	onCreate: (payload: PayloadCreateTopic) => void;
};
type StateController = {
	allState: {
		formData: DataFormTopic;
	};
};

class Controller extends Component<PropsController, StateController> {
	constructor(props: PropsController) {
		super(props);
		this.state = {
			allState: {
				formData: {
					topicName: '',
				},
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(dataItem: DataFormTopic) {
		this.props.onCreate(dataItem);
	}

	render() {
		return <View onSubmit={this.handleSubmit} />;
	}
}

export default memo(Controller);
