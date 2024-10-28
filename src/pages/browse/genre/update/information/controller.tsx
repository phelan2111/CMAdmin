import { Component } from 'react';
import View from './view';
import { UpdateInformationProps } from '.';
import { initialStateItemGenre } from '../../../variables';
import { ResponseGetGenreDetailsOfBrowse } from '@/services/browse/genre/getDetails';
import { PayloadGenreUpdateInformation } from '@/services/browse/genre/updateInformation';
import { ResponseUpload } from '@/services/types';
import { ResponseGetTopicOfBrowse } from '@/services/browse/topic/getList';
import { Helper } from '@/utils/helper';
import { ItemSelect } from '@/components/root/inputs/select';
import { FromStateGenre } from '../../types';

type ControllerState = {
	allState: {
		details: ResponseGetGenreDetailsOfBrowse;
		dataTopicState: ItemSelect[];
		formState: FromStateGenre;
		defaultTopic: ItemSelect;
		keyInitialValue: string;
	};
};

interface ControllerProps extends UpdateInformationProps {
	onUpdateInformation: (dataItem: PayloadGenreUpdateInformation) => void;
	onUploadImage: (dataItem: FormData) => void;
	responseUpload: ResponseUpload;
	response: ResponseGetTopicOfBrowse[];
}

export default class Controller extends Component<ControllerProps, ControllerState> {
	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				details: initialStateItemGenre,
				formState: {
					genreName: '',
					imageGenre: [],
					topic: {
						label: '',
						value: '',
					},
				},
				defaultTopic: {
					label: '',
					value: '',
				},
				dataTopicState: [],
				keyInitialValue: Helper.randomKey(),
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(): void {
		const { allState } = this.state;
		allState.details = this.props.details;
		this.setState({ allState });
	}

	componentDidUpdate(prevProps: Readonly<ControllerProps>): void {
		const { allState } = this.state;
		const { responseUpload, onUpdateInformation } = this.props;

		if (prevProps.responseUpload !== this.props.responseUpload && !Helper.isEmpty(responseUpload.link)) {
			const payload: PayloadGenreUpdateInformation = {
				genreId: allState.details.genreId,
				imageGenre: responseUpload.link,
				nameGenre: allState.formState.genreName,
				topicId: allState.formState.topic.value as string,
			};
			onUpdateInformation(payload);
		}
		if (prevProps.response !== this.props.response) {
			const convertIItemSelect: ItemSelect[] = this.props.response.map((i) => ({
				label: i.topicName,
				value: i._id,
				renderLabel: () => {
					return <p>{i.topicName}</p>;
				},
			}));
			allState.dataTopicState = convertIItemSelect;

			const { index, isExist } = Helper.findItem(convertIItemSelect, 'value', this.props.details.topic.topicId);
			if (isExist) {
				allState.defaultTopic = convertIItemSelect[index];
			}

			allState.keyInitialValue = Helper.randomKey();

			this.setState({ allState });
		}
	}

	handleSubmit(dataItem: FromStateGenre) {
		const { allState } = this.state;
		allState.formState = dataItem;
		this.setState({ allState });
		const { onUploadImage, onUpdateInformation } = this.props;

		if (dataItem.imageGenre[0].file) {
			const formData = new FormData();
			formData.append('file', dataItem.imageGenre[0].file);
			onUploadImage(formData);
		} else {
			const payload: PayloadGenreUpdateInformation = {
				genreId: allState.details.genreId,
				imageGenre: dataItem.imageGenre[0].src,
				nameGenre: dataItem.genreName,
				topicId: dataItem.topic.value as string,
			};
			onUpdateInformation(payload);
		}
	}

	render() {
		return (
			<View
				key={this.state.allState.keyInitialValue}
				dataTopic={this.state.allState.dataTopicState}
				onSubmit={this.handleSubmit}
				topicDefault={this.state.allState.defaultTopic}
				{...this.props}
			/>
		);
	}
}
