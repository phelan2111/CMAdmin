import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import { UpdateInformationProps } from '.';
import Form from '@/components/root/form';
import Localize from '@/langs';
import { number, object, string } from 'yup';
import Button from '@/components/root/button';
import SetupSong from '@/layout/music/song/setUp';
import { Helper } from '@/utils/helper';
import { FromUpdateSetUp } from '@/components/ui/upload/types';

interface IViewProps extends UpdateInformationProps {
	onSubmit: (dataItem: FromUpdateSetUp) => void;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[840px]' title={props.title} description={props.content}>
			<Form
				onSubmit={props.onSubmit}
				defaultValues={{
					setup: {
						uploadData: {
							src: props.details.link,
							uploadId: Helper.randomKey(),
						},
						type: props.details.type,
					},
				}}
				validator={{
					setup: object().shape({
						type: number().required('SETUP_REQUIRED'),
						uploadData: object().shape({
							src: string().required('SETUP_REQUIRED'),
						}),
					}),
				}}
				render={(renderProps) => {
					return (
						<div className='flex flex-col gap-8'>
							<SetupSong name='setup' />
							<Button disabled={!renderProps.formState.isValid} type='submit' className='text-white !rounded-md h-14'>
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
