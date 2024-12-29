import Button from '@/components/root/button';
import Form from '@/components/root/form';
import InputDialog from '@/components/ui/input/dialog';
import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import Localize from '@/langs';
import { DataFormTopic } from '../types';
import { string } from 'yup';

type ViewProps = {
	onSubmit: (dataItem: DataFormTopic) => void;
};

function View(props: ViewProps) {
	return (
		<DialogWrapper title='CREATE_TOPIC' description='CREATE_TOPIC_DESCRIPTION'>
			<Form
				validator={{
					topicName: string().required(),
				}}
				onSubmit={props.onSubmit}
				render={(renderProps) => {
					return (
						<div className='flex flex-col gap-8'>
							<InputDialog label='TOPIC_NAME' name='topicName' />
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
