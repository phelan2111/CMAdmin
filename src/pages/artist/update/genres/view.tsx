import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import { UpdateInformationProps } from '.';
import Form from '@/components/root/form';
import Localize from '@/langs';
import { array } from 'yup';
import Button from '@/components/root/button';
import GenresSelect from '@/layout/artist/genresSelect';
import { DataFormUpdateGenres } from '../../types';

interface IViewProps extends UpdateInformationProps {
	onSubmit: (dataItem: DataFormUpdateGenres) => void;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[1024px]' title={props.title} description={props.content}>
			<Form
				onSubmit={props.onSubmit}
				defaultValues={{
					genres: props.details.genres.map((i) => ({ ...i, _id: i.genreId })),
				}}
				validator={{
					genres: array().required('GENRES_REQUIRED'),
				}}
				render={(renderProps) => {
					return (
						<div className='flex flex-col gap-8'>
							<div className='flex flex-col gap-4 h-[340px] overflow-y-auto scrollHiddenY'>
								<GenresSelect className='border border-primary_dark/10 rounded-lg' name='genres' />
							</div>
							<Button disabled={!renderProps.isValid} type='submit' className='text-white !rounded-md h-14'>
								{Localize('SUBMIT')}
							</Button>
						</div>
					);
				}}
			/>
		</DialogWrapper>
	);
}

export default View;
