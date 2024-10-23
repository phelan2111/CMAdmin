import { Component } from 'react';
import View from './view';
import { ResponseGetListArtist } from '@/services/artist/getSinger';
import { ResponseRequest } from '@/services/types';

type PropsController = {
	data: ResponseRequest<ResponseGetListArtist>;
	isLoading: boolean;
};
type StateController = {
	allState: {
		user: ResponseRequest<ResponseGetListArtist>;
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
	componentDidUpdate(previousProps: PropsController): void {
		const { data } = this.props;
		const { allState } = this.state;
		if (previousProps.isLoading !== this.props.isLoading) {
			allState.user = data;
			this.setState({ allState });
		}
	}

	render() {
		const { allState } = this.state;
		const { isLoading } = this.props;
		return <View isLoading={isLoading} data={allState.user} />;
	}
}
