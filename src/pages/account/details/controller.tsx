import { Component } from 'react';
import View from './view';
import { ModalContext } from '@/contexts/modal';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { PayloadUserDetails, ResponseGetUserDetails } from '@/services/user/getDetails';
import { initialUserDetails } from '../variables';

type ControllerProps = {
	isLoading: boolean;
	onGetTopicDetails: (dataItem: PayloadUserDetails) => void;
	userId: string;
	userDetails: ResponseGetUserDetails;
};
type ControllerState = {
	allState: {
		userDetails: ResponseGetUserDetails;
	};
};

export default class Controller extends Component<ControllerProps, ControllerState> {
	static contextType = ModalContext;
	declare context: React.ContextType<typeof ModalContext>;

	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				userDetails: initialUserDetails,
			},
		};
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleFreshRequest = this.handleFreshRequest.bind(this);
		this.handleRequest = this.handleRequest.bind(this);
	}

	componentDidMount(): void {
		this.handleRequest();
	}
	componentDidUpdate(prevProps: Readonly<ControllerProps>): void {
		console.log('prevProps', prevProps);
		const { allState } = this.state;
		if (this.props.userDetails && prevProps.userDetails !== this.props.userDetails) {
			allState.userDetails = this.props.userDetails;
			this.setState({ allState });
		}
	}
	handleRequest() {
		const { onGetTopicDetails, userId } = this.props;
		onGetTopicDetails({ userId });
	}
	handleUpdate(dataItem: FucCreateGenreProps) {
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
				userDetails={this.state.allState.userDetails}
				onUpdateTopic={this.handleUpdate}
				onFreshRequest={this.handleFreshRequest}
			/>
		);
	}
}
