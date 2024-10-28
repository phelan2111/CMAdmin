import { Component } from 'react';
import View from './view';
import { FromStateGenre } from '../types';
import { ItemSelect } from '@/components/root/inputs/select';
import { ResponseGetTopicOfBrowse } from '@/services/browse/topic/getList';
import { PayloadCreateGenre } from '@/services/browse/genre/create';
import { ResponseUpload } from '@/services/types';
import { Helper } from '@/utils/helper';

type ControllerProps = {
	onCreateGenre: (dataItem: PayloadCreateGenre) => void;
	onUploadImage: (dataItem: FormData) => void;
	response: ResponseGetTopicOfBrowse[];
	responseUpload: ResponseUpload;
};
type ControllerState = {
	allState: {
		formState: FromStateGenre;
		dataTopicState: ItemSelect[];
	};
};
export default class Controller extends Component<ControllerProps, ControllerState> {
	constructor(props: ControllerProps) {
		super(props);
		this.state = {
			allState: {
				formState: {
					genreName: '',
					imageGenre: [],
					topic: {
						label: '',
						value: '',
					},
				},
				dataTopicState: [],
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidUpdate(prevProps: Readonly<ControllerProps>): void {
		const { allState } = this.state;
		const { responseUpload, onCreateGenre } = this.props;

		if (prevProps.responseUpload !== this.props.responseUpload && !Helper.isEmpty(responseUpload.link)) {
			onCreateGenre({
				imageGenre: responseUpload.link,
				nameGenre: this.state.allState.formState.genreName,
				topicId: this.state.allState.formState.topic.value as string,
			});
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

			this.setState({ allState });
		}
	}
	handleSubmit(dataItem: FromStateGenre) {
		const { allState } = this.state;
		allState.formState = dataItem;
		this.setState({ allState });

		const { onUploadImage } = this.props;
		const formData = new FormData();
		if (dataItem.imageGenre[0].file) {
			formData.append('file', dataItem.imageGenre[0].file);
		}
		onUploadImage(formData);
	}

	render() {
		return <View onSubmit={this.handleSubmit} dataTopic={this.state.allState.dataTopicState} />;
	}
}
