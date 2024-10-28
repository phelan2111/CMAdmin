import Button from '@/components/root/button';
import Form from '@/components/root/form';
import InputDialog from '@/components/ui/input/dialog';
import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import Localize from '@/langs';
import UploadBrowse from '@/layout/browse/upload';
import { array, object, string } from 'yup';
import { FromStateGenre } from '../types';
import SelectDialog from '@/components/ui/select/dialog';
import { ItemSelect } from '@/components/root/inputs/select';

type ViewProps = {
	onSubmit: (dataForm: FromStateGenre) => void;
	dataTopic: ItemSelect[];
};

function View(props: ViewProps) {
	return (
		<div className='pr-4 py-8 animate-translateRight'>
			<DialogWrapper title='CREATE_GENRE' description='CREATE_GENRE_DESCRIPTION'>
				<Form
					onSubmit={props.onSubmit}
					defaultValues={{
						imageGenre: [],
						genreName: '',
					}}
					validator={{
						genreName: string().required(Localize('GENRE_NAME_REQUIRED')),
						imageGenre: array().length(1, Localize('IMAGE_REQUIRED_ONE')).required('IMAGE_REQUIRED'),
						topic: object().required(Localize('TOPIC_REQUIRED')),
					}}
					render={(renderProps) => {
						return (
							<div className='flex flex-col gap-8'>
								<InputDialog required label='GENRE_NAME' name='genreName' />
								<UploadBrowse />
								<SelectDialog data={props.dataTopic} name='topic' />
								<Button disabled={!renderProps.isValid} type='submit' className='text-white rounded-[6px] h-14'>
									{Localize('SUBMIT')}
								</Button>
							</div>
						);
					}}
				/>
			</DialogWrapper>
		</div>
	);
}

export default View;
