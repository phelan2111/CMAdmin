import { Component } from 'react';
import View from './view';
import { ResponseRequest } from '@/services/types';
import { ResponseGetUser } from '@/services/user/getList';

type PropsController = {
	data: ResponseRequest<ResponseGetUser>;
	isLoading: boolean;
};
type StateController = {
	allState: {
		user: ResponseRequest<ResponseGetUser>;
	};
};

export default class Controller extends Component<PropsController, StateController> {
	constructor(props: PropsController) {
		super(props);
		this.state = {
			allState: {
				user: {
					list: [],
					total: 0,
				},
			},
		};
	}

	componentDidMount(): void {
		const { data } = this.props;
		const { allState } = this.state;
		if (data?.list) {
			allState.user = data;
			this.setState({ allState });
		}
	}

	render() {
		const { allState } = this.state;

		return <View data={allState.user} />;
	}
}
