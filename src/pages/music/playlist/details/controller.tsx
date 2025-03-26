import { Component } from 'react';
import View from './view';
import { ModalContext } from '@/contexts/modal';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { DataUpload } from '@/components/root/upload/normal';
import { PayloadUpdateInformationArtist } from '@/services/music/artist/updateInformation';
import { initialPlaylistDetails, PayloadPlaylistDetails, ResponsePlaylistDetails } from '@/services/music/playlist/details';

enum TypeUpload {
	cover = 0,
	avatar,
}

type ControllerProps = {
	isLoading: boolean;
	playlistId: string;
	playlistDetails: ResponsePlaylistDetails;
	onPlayListDetails: (dataItem: PayloadPlaylistDetails) => void;
	onUpdateArtist: (dataItem: PayloadUpdateInformationArtist) => void;
};
type ControllerState = {
	allState: {
		playlistDetails: ResponsePlaylistDetails;
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
				playlistDetails: initialPlaylistDetails,
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

		if (this.props.playlistDetails && prevProps.playlistDetails !== this.props.playlistDetails) {
			allState.playlistDetails = this.props.playlistDetails;
			this.setState({ allState });
		}
	}
	handleRequest() {
		const { onPlayListDetails, playlistId } = this.props;
		onPlayListDetails({ playlistId });
	}
	handleUpdate(dataItem: FucCreateGenreProps) {
		const { onModal } = this.context;
		onModal(dataItem.renderComponent);
	}
	handleRequestUpdate(dataItem: Record<string, unknown>) {
		console.log('dataItemdataItemdataItem', dataItem);
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
				playlistDetails={this.state.allState.playlistDetails}
				onUpdateArtist={this.handleUpdate}
				onFreshRequest={this.handleFreshRequest}
				onUploadCover={this.handleUploadCover}
				onUploadAvatar={this.handleUploadAvatar}
			/>
		);
	}
}
