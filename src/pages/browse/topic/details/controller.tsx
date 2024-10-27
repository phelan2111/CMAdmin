import { Component } from 'react';
import View from './view';
import { PayloadTopicDetails, ResponseGetTopicDetailsOfBrowse } from '@/services/browse/topic/getDetails';
import { ModalContext } from '@/contexts/modal';
import { FucCreateTopicProps } from '../types';
import { initialStateItemTopic } from '../../variables';

type ControllerProps = {
	isLoading: boolean;
	data: ResponseGetTopicDetailsOfBrowse;
	onGetTopicDetails: (dataItem: PayloadTopicDetails) => void;
	topicId: string;
};
type ControllerState = {
	allState: {
		topicDetails: ResponseGetTopicDetailsOfBrowse;
	};
};

export default class Controller extends Component<ControllerProps, ControllerState> {
	static contextType = ModalContext;
	declare context: React.ContextType<typeof ModalContext>;

	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				topicDetails: initialStateItemTopic,
			},
		};
		this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
		this.handleFreshRequest = this.handleFreshRequest.bind(this);
		this.handleRequest = this.handleRequest.bind(this);
	}

	componentDidMount(): void {
		this.handleRequest();
	}
	componentDidUpdate(prevProps: Readonly<ControllerProps>): void {
		const { allState } = this.state;
		if (this.props.data && prevProps.data !== this.props.data) {
			allState.topicDetails = this.props.data;
			this.setState({ allState });
		}
	}
	handleRequest() {
		const { onGetTopicDetails, topicId } = this.props;
		onGetTopicDetails({ topicId });
	}
	handleUpdateStatus(dataItem: FucCreateTopicProps) {
		const { onModal } = this.context;
		onModal(dataItem.renderComponent);
	}
	handleFreshRequest() {
		this.handleRequest();
	}

	render() {
		return (
			<View
				isLoading={this.props.isLoading}
				topicDetails={this.state.allState.topicDetails}
				onHiddenTopic={this.handleUpdateStatus}
				onFreshRequest={this.handleFreshRequest}
			/>
		);
	}
}
