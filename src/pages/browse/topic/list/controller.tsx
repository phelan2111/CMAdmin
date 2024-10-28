import { Component } from 'react';
import View from './view';
import { initialResponseRequest, PayloadRequestList, ResponseRequest } from '@/services/types';
import { ResponseGetTopicOfBrowse } from '@/services/browse/topic/getList';
import { ModalContext } from '@/contexts/modal';
import { FucCreateTopicProps } from '../types';
import { FROM, LIMIT, SORT } from '@/utils/variables';
import { PagingState } from '@/components/root/grid/types';
import { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import { EnumStatusBrowse } from '@/utils/enums';

type PropsController = {
	data: ResponseRequest<ResponseGetTopicOfBrowse>;
	isLoading: boolean;
	onRequestListTopic: (params: PayloadRequestList) => void;
};
type StateController = {
	allState: {
		payload: PayloadRequestList;
	};
};

const initialPayloadState: PayloadRequestList = {
	from: FROM,
	limit: LIMIT,
	createdAt: SORT.DESC,
	search: '',
	status: EnumStatusBrowse.display,
};
export default class Controller extends Component<PropsController, StateController> {
	static contextType = ModalContext;
	declare context: React.ContextType<typeof ModalContext>;

	constructor(props: PropsController) {
		super(props);
		this.state = {
			allState: {
				payload: { ...initialPayloadState },
			},
		};
		this.handleCreateTopic = this.handleCreateTopic.bind(this);
		this.handleChangePagingAndReRequest = this.handleChangePagingAndReRequest.bind(this);
		this.handleReRequest = this.handleReRequest.bind(this);
		this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
		this.handleFilterStatus = this.handleFilterStatus.bind(this);
	}

	componentDidMount(): void {
		this.handleReRequest();
	}

	handleReRequest() {
		const { allState } = this.state;
		const { onRequestListTopic } = this.props;
		onRequestListTopic(allState.payload);
	}
	handleCreateTopic(dataItem: FucCreateTopicProps) {
		const { onModal } = this.context;
		onModal(dataItem.renderComponent);
	}

	handleChangePagingAndReRequest(dataItem: PagingState) {
		const { allState } = this.state;

		allState.payload.from = dataItem.skip;
		allState.payload.limit = dataItem.take;

		this.setState({ allState });
		this.handleReRequest();
	}
	handleOnChangeSearch(dataItem: string) {
		const { allState } = this.state;

		if (dataItem !== allState.payload.search) {
			allState.payload.search = dataItem;

			this.setState({ allState });
			this.handleReRequest();
		}
	}
	handleFilterStatus(dataItem: FilterStatusItem) {
		const { allState } = this.state;

		allState.payload.status = dataItem.value;

		this.setState({ allState });
		this.handleReRequest();
	}
	handleRefreshRequest() {
		const { allState } = this.state;
		allState.payload = initialPayloadState;
		this.setState({ allState });
		this.handleReRequest();
	}

	render() {
		const { isLoading, data = initialResponseRequest as ResponseRequest<ResponseGetTopicOfBrowse> } = this.props;

		return (
			<View
				isLoading={isLoading}
				data={data}
				onCreateTopic={this.handleCreateTopic}
				onChangePaging={this.handleChangePagingAndReRequest}
				onChangeSearch={this.handleOnChangeSearch}
				onChangeFilterStatus={this.handleFilterStatus}
				onRefreshRequest={this.handleReRequest}
			/>
		);
	}
}
