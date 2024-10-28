import { Component } from 'react';
import View from './view';
import { initialResponseRequest, PayloadRequestList, ResponseRequest } from '@/services/types';
import { ResponseGetGenreOfBrowse } from '@/services/browse/genre/getList';
import { FROM, LIMIT, SORT } from '@/utils/variables';
import { EnumStatusBrowse } from '@/utils/enums';
import { FucCreateGenreProps } from '../types';
import { ModalContext } from '@/contexts/modal';
import { PagingState } from '@/components/root/grid/types';
import { FilterStatusItem } from '@/components/ui/common/tool/filter/status';

type PropsController = {
	data: ResponseRequest<ResponseGetGenreOfBrowse>;
	isLoading: boolean;
	onRequestListGenre: (params: PayloadRequestList) => void;
};
type StateController = {
	allState: {
		payload: PayloadRequestList;
	};
};

const initialPayload: PayloadRequestList = {
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
				payload: initialPayload,
			},
		};
		this.handleCreateGenre = this.handleCreateGenre.bind(this);
		this.handleChangePagingAndReRequest = this.handleChangePagingAndReRequest.bind(this);
		this.handleRequest = this.handleRequest.bind(this);
		this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
		this.handleFilterStatus = this.handleFilterStatus.bind(this);
		this.handleRefreshRequest = this.handleRefreshRequest.bind(this);
	}

	componentDidMount(): void {
		this.handleRequest();
	}
	handleRequest() {
		const { allState } = this.state;
		const { onRequestListGenre } = this.props;
		onRequestListGenre(allState.payload);
	}
	handleRefreshRequest() {
		const { allState } = this.state;
		allState.payload = initialPayload;
		this.setState({ allState });
		const { onRequestListGenre } = this.props;
		onRequestListGenre(initialPayload);
	}
	handleCreateGenre(dataItem: FucCreateGenreProps) {
		const { onModal } = this.context;
		onModal(dataItem.renderComponent);
	}
	handleChangePagingAndReRequest(dataItem: PagingState) {
		const { allState } = this.state;

		allState.payload.from = dataItem.skip;
		allState.payload.limit = dataItem.take;

		this.setState({ allState });
		this.handleRequest();
	}
	handleOnChangeSearch(dataItem: string) {
		const { allState } = this.state;

		if (dataItem !== allState.payload.search) {
			allState.payload.search = dataItem;

			this.setState({ allState });
			this.handleRequest();
		}
	}
	handleFilterStatus(dataItem: FilterStatusItem) {
		const { allState } = this.state;

		allState.payload.status = dataItem.value;

		this.setState({ allState });
		this.handleRequest();
	}

	render() {
		const { isLoading, data = initialResponseRequest as ResponseRequest<ResponseGetGenreOfBrowse> } = this.props;

		return (
			<View
				isLoading={isLoading}
				data={data}
				onChangeFilterStatus={this.handleFilterStatus}
				onChangeSearch={this.handleOnChangeSearch}
				onCreateGenre={this.handleCreateGenre}
				onRefreshRequest={this.handleRefreshRequest}
				onChangePaging={this.handleChangePagingAndReRequest}
			/>
		);
	}
}
