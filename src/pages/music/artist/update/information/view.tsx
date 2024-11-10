import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import { UpdateInformationProps } from '.';
import Form from '@/components/root/form';
import InputDialog from '@/components/ui/input/dialog';
import Localize from '@/langs';
import { string } from 'yup';
import Button from '@/components/root/button';
import { DataFormUpdateIntro } from '../../types';
import TextAreaField from '@/components/root/inputs/textarea';

interface IViewProps extends UpdateInformationProps {
	onSubmit: (dataItem: DataFormUpdateIntro) => void;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[480px]' title={props.title} description={props.content}>
			<Form
				onSubmit={props.onSubmit}
				defaultValues={{
					singerName: props.details.singerName,
					singerDescription: props.details.singerDescription,
				}}
				validator={{
					singerName: string().required('SINGER_NAME_REQUIRED'),
					singerDescription: string().required('SINGER_DESCRIPTION_REQUIRED'),
				}}
				render={(renderProps) => {
					return (
						<div className='flex flex-col gap-8'>
							<div className='flex flex-col gap-4'>
								<InputDialog required label='ARTIST_NAME' name='singerName' />
								<div className='animate-translateRight'>
									<TextAreaField
										className='!bg-white !rounded-lg'
										classNameTextArea='!text-primary_dark'
										required
										label='ARTIST_DESCRIPTION'
										name='singerDescription'
									/>
								</div>
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
