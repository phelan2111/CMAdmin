import { Logger } from '@/utils/logger';
import { DataFormSignIn } from './types';
import View from './view';

import { Component } from 'react';

type PropsController = {
	data?: unknown;
	onLogin: (dataForm: DataFormSignIn) => void;
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
		Logger.debug('Controller execute handleSubmit', dataForm);
	}

	render() {
		return <View onSubmit={this.handleSubmit} />;
	}
}
