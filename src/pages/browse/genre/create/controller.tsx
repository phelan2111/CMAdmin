import { Component } from 'react';
import View from './view';
import { FromStateCreateGenre } from '../types';
import { ItemSelect } from '@/components/root/inputs/select';
import { ResponseGetTopicOfBrowse } from '@/services/browse/topic/getList';
import { Helper } from '@/utils/helper';

type ControllerProps = {
	onCreateGenre: VoidFunction;
	onUploadImage: VoidFunction;
	response: ResponseGetTopicOfBrowse[];
};
type ControllerState = {
	allState: {
		formState: FromStateCreateGenre;
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
				},
				dataTopicState: [],
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(): void {
		const { allState } = this.state;

		if (!Helper.isEmpty(this.props.response)) {
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
	handleSubmit() {}

	render() {
		return <View onSubmit={this.handleSubmit} dataTopic={this.state.allState.dataTopicState} />;
	}
}
