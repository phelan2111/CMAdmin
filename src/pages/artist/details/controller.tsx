import { Component } from 'react';
import View from './view';
import { ModalContext } from '@/contexts/modal';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { DataUpload } from '@/components/root/upload/normal';
import { ResponseUpload } from '@/services/types';
import { PayloadUpdateInformationUser } from '@/services/user/updateInformation';
import { initialArtistDetails, PayloadArtistDetails, ResponseGetArtistDetails } from '@/services/artist/getDetails';

enum TypeUpload {
	cover = 0,
	avatar,
}

type ControllerProps = {
	isLoading: boolean;
	artistId: string;
	artistDetails: ResponseGetArtistDetails;
	responseUpload: ResponseUpload;
	onUpload: (dataItem: FormData) => void;
	onGetTopicDetails: (dataItem: PayloadArtistDetails) => void;
	onUpdateUser: (dataItem: PayloadUpdateInformationUser) => void;
};
type ControllerState = {
	allState: {
		artistDetails: ResponseGetArtistDetails;
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
				artistDetails: initialArtistDetails,
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
		// const { responseUpload, onUpdateUser } = this.props;

		if (this.props.artistDetails && prevProps.artistDetails !== this.props.artistDetails) {
			allState.artistDetails = this.props.artistDetails;
			this.setState({ allState });
		}
		// if (responseUpload !== prevProps.responseUpload && !Helper.isEmpty(responseUpload?.link)) {
		// 	const { createdAt, updatedAt, status, role, ...rest } = allState.artistDetails;
		// 	Logger.debug('componentDidUpdate execute', [createdAt, updatedAt, status, role]);

		// 	const payloadUpdate: PayloadUpdateInformationUser = {
		// 		...rest,
		// 	};
		// 	if (allState.typeUpload === TypeUpload.avatar) {
		// 		onUpdateUser({
		// 			...payloadUpdate,
		// 			avatar: responseUpload.link,
		// 		});
		// 	} else {
		// 		onUpdateUser({
		// 			...payloadUpdate,
		// 			cover: responseUpload.link,
		// 		});
		// 	}
		// }
	}
	handleRequest() {
		const { onGetTopicDetails, artistId } = this.props;
		onGetTopicDetails({ artistId });
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
				artistDetails={this.state.allState.artistDetails}
				onUpdateUser={this.handleUpdate}
				onFreshRequest={this.handleFreshRequest}
				onUploadCover={this.handleUploadCover}
				onUploadAvatar={this.handleUploadAvatar}
			/>
		);
	}
}
