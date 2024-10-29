import { Component } from 'react';
import View from './view';
import { ModalContext } from '@/contexts/modal';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { PayloadUserDetails, ResponseGetUserDetails } from '@/services/user/getDetails';
import { initialUserDetails } from '../variables';
import { DataUpload } from '@/components/root/upload/normal';
import { ResponseUpload } from '@/services/types';
import { PayloadUpdateInformationUser } from '@/services/user/updateInformation';
import { Helper } from '@/utils/helper';
import { Logger } from '@/utils/logger';

enum TypeUpload {
	cover = 0,
	avatar,
}

type ControllerProps = {
	isLoading: boolean;
	userId: string;
	userDetails: ResponseGetUserDetails;
	responseUpload: ResponseUpload;
	onUpload: (dataItem: FormData) => void;
	onGetTopicDetails: (dataItem: PayloadUserDetails) => void;
	onUpdateUser: (dataItem: PayloadUpdateInformationUser) => void;
};
type ControllerState = {
	allState: {
		userDetails: ResponseGetUserDetails;
		typeUpload: TypeUpload;
	};
};

export default class Controller extends Component<ControllerProps, ControllerState> {
	static contextType = ModalContext;
	declare context: React.ContextType<typeof ModalContext>;

	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				userDetails: initialUserDetails,
				typeUpload: TypeUpload.avatar,
			},
		};
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleFreshRequest = this.handleFreshRequest.bind(this);
		this.handleRequest = this.handleRequest.bind(this);
		this.handleUploadCover = this.handleUploadCover.bind(this);
		this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
		this.handleRequestUpload = this.handleRequestUpload.bind(this);
	}

	componentDidMount(): void {
		this.handleRequest();
	}

	componentDidUpdate(prevProps: Readonly<ControllerProps>): void {
		const { allState } = this.state;
		const { responseUpload, onUpdateUser } = this.props;

		if (this.props.userDetails && prevProps.userDetails !== this.props.userDetails) {
			allState.userDetails = this.props.userDetails;
			this.setState({ allState });
		}
		if (responseUpload !== prevProps.responseUpload && !Helper.isEmpty(responseUpload?.link)) {
			const { createdAt, updatedAt, status, role, ...rest } = allState.userDetails;
			Logger.debug('componentDidUpdate execute', [createdAt, updatedAt, status, role]);

			const payloadUpdate: PayloadUpdateInformationUser = {
				...rest,
			};
			if (allState.typeUpload === TypeUpload.avatar) {
				onUpdateUser({
					...payloadUpdate,
					avatar: responseUpload.link,
				});
			} else {
				onUpdateUser({
					...payloadUpdate,
					cover: responseUpload.link,
				});
			}
		}
	}
	handleRequest() {
		const { onGetTopicDetails, userId } = this.props;
		onGetTopicDetails({ userId });
	}
	handleUpdate(dataItem: FucCreateGenreProps) {
		const { onModal } = this.context;
		onModal(dataItem.renderComponent);
	}
	handleFreshRequest() {
		this.handleRequest();
	}
	handleRequestUpload(file: File) {
		const formData = new FormData();
		formData.append('file', file);
		this.props.onUpload(formData);
	}
	handleUploadCover(dataItem: DataUpload) {
		const { allState } = this.state;
		allState.typeUpload = TypeUpload.cover;
		this.setState({ allState });
		if (dataItem.file) this.handleRequestUpload(dataItem.file);
	}
	handleUploadAvatar(dataItem: DataUpload) {
		const { allState } = this.state;
		allState.typeUpload = TypeUpload.avatar;
		this.setState({ allState });
		if (dataItem.file) this.handleRequestUpload(dataItem.file);
	}

	render() {
		return (
			<View
				isLoading={this.props.isLoading}
				userDetails={this.state.allState.userDetails}
				onUpdateUser={this.handleUpdate}
				onFreshRequest={this.handleFreshRequest}
				onUploadCover={this.handleUploadCover}
				onUploadAvatar={this.handleUploadAvatar}
			/>
		);
	}
}
