import { Component } from 'react';
import View from './view';
import { ModalContext } from '@/contexts/modal';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { DataUpload } from '@/components/root/upload/normal';
import { PayloadUpdateInformationArtist } from '@/services/music/artist/updateInformation';
import { initialSongDetails, PayloadSongDetails, ResponseGetSongDetails } from '@/services/music/song/getDetails';

enum TypeUpload {
	cover = 0,
	avatar,
}

type ControllerProps = {
	isLoading: boolean;
	songId: string;
	songDetails: ResponseGetSongDetails;
	onSongDetails: (dataItem: PayloadSongDetails) => void;
	onUpdateArtist: (dataItem: PayloadUpdateInformationArtist) => void;
};
type ControllerState = {
	allState: {
		songDetails: ResponseGetSongDetails;
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
				songDetails: initialSongDetails,
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

		if (this.props.songDetails && prevProps.songDetails !== this.props.songDetails) {
			allState.songDetails = this.props.songDetails;
			this.setState({ allState });
		}
	}
	handleRequest() {
		const { onSongDetails, songId } = this.props;
		onSongDetails({ songId });
	}
	handleUpdate(dataItem: FucCreateGenreProps) {
		const { onModal } = this.context;
		onModal(dataItem.renderComponent);
	}
	handleRequestUpdate(dataItem: Record<string, unknown>) {
		console.log('dataItem', dataItem);
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
				songDetails={this.state.allState.songDetails}
				onUpdateArtist={this.handleUpdate}
				onFreshRequest={this.handleFreshRequest}
				onUploadCover={this.handleUploadCover}
				onUploadAvatar={this.handleUploadAvatar}
			/>
		);
	}
}
