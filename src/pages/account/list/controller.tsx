import { Component } from 'react';
import View from './view';
import { initialResponseRequest, PayloadRequestList, ResponseRequest } from '@/services/types';
import { ResponseGetUser } from '@/services/user/getList';
import { FROM, LIMIT, SORT } from '@/utils/variables';
import { EnumStatusAccount } from '@/utils/enums';
import { PagingState } from '@/components/root/grid/types';
import { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import { FucCreateAccountProps } from '../types';
import { ModalContext } from '@/contexts/modal';

type PropsController = {
	data: ResponseRequest<ResponseGetUser>;
	isLoading: boolean;
	onRequestListUser: (params: PayloadRequestList) => void;
};
type StateController = {
	allState: {
		payload: PayloadRequestList;
	};
};

export default class Controller extends Component<PropsController, StateController> {
	static contextType = ModalContext;
	declare context: React.ContextType<typeof ModalContext>;

	constructor(props: PropsController) {
		super(props);
		this.state = {
			allState: {
				payload: {
					from: FROM,
					limit: LIMIT,
					createdAt: SORT.DESC,
					search: '',
					status: EnumStatusAccount.inactive,
				},
			},
		};
		this.handleCreateAccount = this.handleCreateAccount.bind(this);
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
		const { onRequestListUser } = this.props;
		onRequestListUser(allState.payload);
	}
	handleCreateAccount(dataItem: FucCreateAccountProps) {
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

	render() {
		const { isLoading, data = initialResponseRequest as ResponseRequest<ResponseGetUser> } = this.props;

		return (
			<View
				isLoading={isLoading}
				data={data}
				onChangeFilterStatus={this.handleFilterStatus}
				onChangeSearch={this.handleOnChangeSearch}
				onCreateAccount={this.handleCreateAccount}
			/>
		);
	}
}
