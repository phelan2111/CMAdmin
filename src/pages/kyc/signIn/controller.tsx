import { Logger } from '@/utils/logger';
import { DataFormSignIn } from './types';
import View from './view';

import { Component } from 'react';

type PropsController = {
	data?: unknown;
	onLogin: (dataForm: DataFormSignIn) => void;
	isLoading: boolean;
};
type StateController = {
	allState: unknown;
};
export default class Controller extends Component<PropsController, StateController> {
	constructor(props: PropsController) {
		super(props);
		this.state = {
			allState: {},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(dataForm: DataFormSignIn) {
		this.props.onLogin(dataForm);

		Logger.debug('Controller execute handleSubmit', dataForm);
	}

	render() {
		return <View isLoading={this.props.isLoading} onSubmit={this.handleSubmit} />;
	}
}
