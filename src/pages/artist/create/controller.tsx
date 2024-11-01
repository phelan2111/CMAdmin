import { Component } from 'react';
import View from './view';
import { DataFormCreateSinger } from '../types';
import { GenreOfSinger, PayloadCreateSinger } from '@/services/artist/create';
import { Helper } from '@/utils/helper';
type ControllerProps = {
	onCreateSinger: (dataItem: PayloadCreateSinger) => void;
};

export default class Controller extends Component<ControllerProps> {
	constructor(props: ControllerProps) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit({ facebook, instagram, ...dataItem }: DataFormCreateSinger) {
		const socials = Helper.cleanObject({
			facebook: facebook,
			instagram: instagram,
		});
		const genres: GenreOfSinger[] = dataItem.genres.map((i) => ({
			nameGenre: i.nameGenre,
			imageGenre: i.imageGenre,
			status: i.status,
			genreId: i._id,
		}));
		const payload: PayloadCreateSinger = {
			...dataItem,
			singerAvatar: dataItem.singerAvatar.src,
			singerCover: dataItem.singerCover.map((i) => i.src),
			genres,
		};
		if (!Helper.isEmpty(socials)) {
			payload.socials = socials;
		}
		this.props.onCreateSinger(payload);
	}

	render() {
		return <View onSubmit={this.handleSubmit} />;
	}
}
