import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import Button from '@/components/root/button';
import Localize from '@/langs';
import { string } from 'yup';
import Form from '@/components/root/form';
import InputDialog from '@/components/ui/input/dialog';
import { UpdateInformationProps } from '.';
import { DataFormTopic } from '../../types';

interface IViewProps extends UpdateInformationProps {
	onSubmit: (dataItem: DataFormTopic) => void;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[480px]' title={props.title} description={props.content}>
			<Form
				validator={{
					topicName: string().required(),
				}}
				defaultValues={{
					topicName: props.details.topicName,
				}}
				onSubmit={props.onSubmit}
				render={() => {
					return (
						<div className='flex flex-col gap-8'>
							<InputDialog label='TOPIC_NAME' name='topicName' />
							<Button type='submit' className='text-white rounded-[6px] h-14'>
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
