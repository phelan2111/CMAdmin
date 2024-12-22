import { Component } from 'react';
import View from './view';
import { ModalContext } from '@/contexts/modal';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { DataUpload } from '@/components/root/upload/normal';
import { initialSongDetails, PayloadSongDetails, ResponseGetSongDetails } from '@/services/music/song/getDetails';
import { PayloadUpdateInformationSong } from '@/services/music/song/updateInformation';
import { SingerOfSong } from '@/services/music/song/create';

type ControllerProps = {
	isLoading: boolean;
	songId: string;
	songDetails: ResponseGetSongDetails;
	onSongDetails: (dataItem: PayloadSongDetails) => void;
	onUpdateSong: (dataItem: PayloadUpdateInformationSong) => void;
};
type ControllerState = {
	allState: {
		songDetails: ResponseGetSongDetails;
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
			},
		};
		this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
		this.handleFreshRequest = this.handleFreshRequest.bind(this);
		this.handleRequest = this.handleRequest.bind(this);
		this.handleUploadImage = this.handleUploadImage.bind(this);
		this.handleRequestUpdate = this.handleRequestUpdate.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
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
	handleUpdateStatus(dataItem: FucCreateGenreProps) {
		const { onModal } = this.context;
		onModal(dataItem.renderComponent);
	}
	handleUpdate(dataItem: FucCreateGenreProps) {
		const { onModal } = this.context;
		onModal(dataItem.renderComponent);
	}
	handleRequestUpdate(dataItem: Record<string, unknown>) {
		const { songDetails } = this.state.allState;
		const singers: SingerOfSong[] = songDetails.singer.map((s) => ({
			followers: s.followers,
			singerAvatar: s.singerAvatar,
			singerCover: s.singerCover,
			singerDescription: s.singerDescription,
			singerId: s.singerId,
			singerName: s.singerName,
			socials: s.socials,
			status: s.status,
		}));

		const payload: PayloadUpdateInformationSong = {
			songId: songDetails.songId,
			image: songDetails.image,
			link: songDetails.link,
			singers,
			songDescription: songDetails.songDescription,
			songName: songDetails.songName,
			type: songDetails.type,
			...dataItem,
		};

		this.props.onUpdateSong(payload);
	}
	handleFreshRequest() {
		this.handleRequest();
	}
	handleUploadImage(dataItem: DataUpload) {
		this.handleRequestUpdate({ image: dataItem.src });
	}

	render() {
		return (
			<View
				isLoading={this.props.isLoading}
				songDetails={this.state.allState.songDetails}
				onUpdateStatus={this.handleUpdateStatus}
				onFreshRequest={this.handleFreshRequest}
				onUploadImage={this.handleUploadImage}
				onUpdate={this.handleUpdate}
			/>
		);
	}
}
