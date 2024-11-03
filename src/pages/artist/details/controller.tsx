import { Component } from 'react';
import View from './view';
import { ModalContext } from '@/contexts/modal';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { DataUpload } from '@/components/root/upload/normal';
import { initialArtistDetails, PayloadArtistDetails, ResponseGetArtistDetails } from '@/services/artist/getDetails';
import { PayloadUpdateInformationArtist } from '@/services/artist/updateInformation';

enum TypeUpload {
	cover = 0,
	avatar,
}

type ControllerProps = {
	isLoading: boolean;
	artistId: string;
	artistDetails: ResponseGetArtistDetails;
	onGetTopicDetails: (dataItem: PayloadArtistDetails) => void;
	onUpdateArtist: (dataItem: PayloadUpdateInformationArtist) => void;
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
		this.handleRequestUpdate = this.handleRequestUpdate.bind(this);
	}

	componentDidMount(): void {
		this.handleRequest();
	}

	componentDidUpdate(prevProps: Readonly<ControllerProps>): void {
		const { allState } = this.state;

		if (this.props.artistDetails && prevProps.artistDetails !== this.props.artistDetails) {
			allState.artistDetails = this.props.artistDetails;
			this.setState({ allState });
		}
	}
	handleRequest() {
		const { onGetTopicDetails, artistId } = this.props;
		onGetTopicDetails({ artistId });
	}
	handleUpdate(dataItem: FucCreateGenreProps) {
		const { onModal } = this.context;
		onModal(dataItem.renderComponent);
	}
	handleRequestUpdate(dataItem: Record<string, unknown>) {
		const { artistDetails } = this.state.allState;
		const { onUpdateArtist } = this.props;
		const payload: PayloadUpdateInformationArtist = {
			genres: artistDetails.genres,
			singerAvatar: artistDetails.singerAvatar,
			singerCover: artistDetails.singerCover,
			singerDescription: artistDetails.singerDescription,
			singerId: artistDetails.singerId,
			singerName: artistDetails.singerName,
			socials: artistDetails.socials,
			...dataItem,
		};
		onUpdateArtist(payload);
	}
	handleFreshRequest() {
		this.handleRequest();
	}
	handleUploadCover(dataItem: DataUpload[]) {
		const singerCover = dataItem.map((i) => i.src);
		this.handleRequestUpdate({ singerCover });
	}
	handleUploadAvatar(dataItem: DataUpload) {
		this.handleRequestUpdate({ singerAvatar: dataItem.src });
	}

	render() {
		return (
			<View
				isLoading={this.props.isLoading}
				artistDetails={this.state.allState.artistDetails}
				onUpdateArtist={this.handleUpdate}
				onFreshRequest={this.handleFreshRequest}
				onUploadCover={this.handleUploadCover}
				onUploadAvatar={this.handleUploadAvatar}
			/>
		);
	}
}
