import { Component } from 'react';
import View from './view';
import { UpdateStatusProps } from '.';
import { EnumStatusAccount } from '@/utils/enums';
import { ResponseGetUserDetails } from '@/services/user/getDetails';
import { initialStateItemUser } from '../../variables';
import { PayloadUserUpdateStatus } from '@/services/user/updateStatus';

type ControllerState = {
	allState: {
		details: ResponseGetUserDetails;
	};
};

interface ControllerProps extends UpdateStatusProps {
	onUpdateStatus: (dataItem: PayloadUserUpdateStatus) => void;
}

export default class Controller extends Component<ControllerProps, ControllerState> {
	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				details: initialStateItemUser,
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(): void {
		const { allState } = this.state;
		allState.details = this.props.details;
		this.setState({ allState });
	}

	handleSubmit() {
		const isActiveStatus = this.props.details.status === EnumStatusAccount.active;
		if (isActiveStatus) {
			this.props.onUpdateStatus({
				status: EnumStatusAccount.lock,
				userId: this.state.allState.details.userId,
			});
		} else {
			this.props.onUpdateStatus({
				status: EnumStatusAccount.active,
				userId: this.state.allState.details.userId,
			});
		}
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
