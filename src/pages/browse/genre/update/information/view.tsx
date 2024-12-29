import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import { UpdateInformationProps } from '.';
import Button from '@/components/root/button';
import Localize from '@/langs';
import Form from '@/components/root/form';
import { array, object, string } from 'yup';
import InputDialog from '@/components/ui/input/dialog';
import UploadBrowse from '@/layout/browse/upload';
import SelectDialog from '@/components/ui/select/dialog';
import { ItemSelect } from '@/components/root/inputs/select';
import { Helper } from '@/utils/helper';
import { FromStateGenre } from '../../types';

interface IViewProps extends UpdateInformationProps {
	onSubmit: (dataItem: FromStateGenre) => void;
	dataTopic: ItemSelect[];
	topicDefault: ItemSelect;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[480px]' title={props.title} description={props.content}>
			<Form
				onSubmit={props.onSubmit}
				defaultValues={{
					imageGenre: [
						{
							uploadId: Helper.randomKey(),
							src: props.details.imageGenre,
						},
					],
					genreName: props.details.nameGenre,
					topic: props.topicDefault,
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
							<Button disabled={!renderProps.formState.isValid} type='submit' className='text-white rounded-[6px] h-14'>
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
