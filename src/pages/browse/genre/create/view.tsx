import Button from '@/components/root/button';
import Form from '@/components/root/form';
import InputDialog from '@/components/ui/input/dialog';
import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import Localize from '@/langs';
import UploadBrowse from '@/layout/browse/upload';
import { array, string } from 'yup';
import { FromStateCreateGenre } from '../types';
import SelectDialog from '@/components/ui/select/dialog';
import { ItemSelect } from '@/components/root/inputs/select';

type ViewProps = {
	onSubmit: (dataForm: FromStateCreateGenre) => void;
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
					}}
					validator={{
						genreName: string().required(),
						imageGenre: array().required(),
					}}
					render={() => {
						return (
							<div className='flex flex-col gap-8'>
								<InputDialog required label='GENRE_NAME' name='genreName' />
								<UploadBrowse />
								<SelectDialog classNamePopper='!h-40' data={props.dataTopic} name='topic' />
								<Button type='submit' className='text-white rounded-[6px] h-14'>
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
