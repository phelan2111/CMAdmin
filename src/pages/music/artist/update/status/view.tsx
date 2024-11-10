import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import { UpdateStatusProps } from '.';
import Button from '@/components/root/button';
import Localize from '@/langs';

interface IViewProps extends Pick<UpdateStatusProps, 'content' | 'title'> {
	onSubmit: VoidFunction;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[480px]' title={props.title} description={props.content}>
			<Button onClick={props.onSubmit} type='submit' className='text-white rounded-[6px] h-14'>
				{Localize('SUBMIT')}
			</Button>
		</DialogWrapper>
	);
}

export default View;
