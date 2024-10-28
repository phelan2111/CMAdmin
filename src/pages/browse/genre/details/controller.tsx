import { Component } from 'react';
import View from './view';
import { ModalContext } from '@/contexts/modal';
import { initialStateItemGenre } from '../../variables';
import { FucCreateGenreProps } from '../types';
import { PayloadGenreDetails, ResponseGetGenreDetailsOfBrowse } from '@/services/browse/genre/getDetails';

type ControllerProps = {
	isLoading: boolean;
	data: ResponseGetGenreDetailsOfBrowse;
	onGetTopicDetails: (dataItem: PayloadGenreDetails) => void;
	genreId: string;
};
type ControllerState = {
	allState: {
		genreDetails: ResponseGetGenreDetailsOfBrowse;
	};
};

export default class Controller extends Component<ControllerProps, ControllerState> {
	static contextType = ModalContext;
	declare context: React.ContextType<typeof ModalContext>;

	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				genreDetails: initialStateItemGenre,
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
			allState.genreDetails = this.props.data;
			this.setState({ allState });
		}
	}
	handleRequest() {
		const { onGetTopicDetails, genreId } = this.props;
		onGetTopicDetails({ genreId });
	}
	handleUpdateStatus(dataItem: FucCreateGenreProps) {
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
				genreDetails={this.state.allState.genreDetails}
				onHiddenTopic={this.handleUpdateStatus}
				onFreshRequest={this.handleFreshRequest}
			/>
		);
	}
}
