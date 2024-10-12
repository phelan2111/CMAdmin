import { Logger } from '@/utils/logger';
import { DataFormSignIn } from './types';
import View from './view';

import { Component } from 'react';
import { Helper } from '@/utils/helper';

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
		Helper.hasPassword(dataForm.password)
			.then((password) => {
				this.props.onLogin({
					email: dataForm.email,
					password,
				});
			})
			.catch((err) => {
				Logger.error('HasPassword failed', err.toString());
			});
		Logger.debug('Controller execute handleSubmit', dataForm);
	}

	render() {
		return <View onSubmit={this.handleSubmit} />;
	}
}
