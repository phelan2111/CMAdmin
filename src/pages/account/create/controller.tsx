import { Component } from 'react';
import View from './view';
import { PayloadCreateUser } from '@/services/user/createAccount';
import { DataFormCreate } from '../types';
import { Gender, Role } from '@/utils/enums';
type ControllerProps = {
	onCreateUser: (dataItem: PayloadCreateUser) => void;
};

export default class Controller extends Component<ControllerProps> {
	constructor(props: ControllerProps) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(dataItem: DataFormCreate) {
		const { onCreateUser } = this.props;
		const payload: PayloadCreateUser = {
			...dataItem,
			cover: dataItem.cover.src,
			avatar: dataItem.avatar.src,
			role: dataItem.role.value as Role,
			gender: dataItem.gender.value as Gender,
		};
		onCreateUser(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} />;
	}
}
