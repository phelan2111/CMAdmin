import { Component } from 'react';
import View from './view';
import { ResponseGetListArtist } from '@/services/music/artist/getSinger';
import { initialResponseRequest, PayloadRequestList, ResponseRequest } from '@/services/types';
import { FROM, LIMIT, SORT } from '@/utils/variables';
import { EnumStatusArtist } from '@/utils/enums';
import { PagingState } from '@/components/root/grid/types';
import { FilterStatusItem } from '@/components/ui/common/tool/filter/status';

type PropsController = {
	data: ResponseRequest<ResponseGetListArtist>;
	isLoading: boolean;
	onGetListArtist: (params: PayloadRequestList) => void;
};
type StateController = {
	allState: {
		payload: PayloadRequestList;
	};
};

export default class Controller extends Component<PropsController, StateController> {
	constructor(props: PropsController) {
		super(props);
		this.state = {
			allState: {
				payload: {
					from: FROM,
					limit: LIMIT,
					createdAt: SORT.DESC,
					search: '',
					status: EnumStatusArtist.inactive,
				},
			},
		};
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
		const { onGetListArtist } = this.props;
		onGetListArtist(allState.payload);
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
		const { isLoading, data = initialResponseRequest as ResponseRequest<ResponseGetListArtist> } = this.props;
		return (
			<View
				isLoading={isLoading}
				data={data}
				onChangeFilterStatus={this.handleFilterStatus}
				onChangeSearch={this.handleOnChangeSearch}
				onChangePaging={this.handleChangePagingAndReRequest}
			/>
		);
	}
}
