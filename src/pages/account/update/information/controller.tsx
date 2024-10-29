import { Component } from 'react';
import View from './view';
import { UpdateInformationProps } from '.';
import { ResponseGetUserDetails } from '@/services/user/getDetails';
import { DataFormUpdate } from '../../types';
import { EnumStatusAccount, Gender, Role } from '@/utils/enums';
import { PayloadUpdateInformationUser } from '@/services/user/updateInformation';
import { Helper } from '@/utils/helper';

type ControllerState = {
	allState: {
		details: ResponseGetUserDetails;
	};
};

interface ControllerProps extends UpdateInformationProps {
	onUpdateUser: (dataItem: PayloadUpdateInformationUser) => void;
}

export default class Controller extends Component<ControllerProps, ControllerState> {
	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				details: {
					createdAt: '',
					email: '',
					firstName: '',
					lastName: '',
					role: Role.user,
					status: EnumStatusAccount.active,
					updatedAt: '',
					userId: '',
				},
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(): void {
		const { allState } = this.state;
		allState.details = this.props.details;
		this.setState({ allState });
	}

	handleSubmit(dataItem: DataFormUpdate) {
		const payload = Helper.cleanObject({
			...dataItem,
			gender: dataItem.gender?.value as Gender,
			userId: this.state.allState.details.userId,
		}) as PayloadUpdateInformationUser;

		this.props.onUpdateUser(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} {...this.props} />;
	}
}
