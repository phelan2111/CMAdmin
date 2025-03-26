import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import { UpdateStatusProps } from '.';
import Form from '@/components/root/form';
import { FormUpdateSongs } from '../../types';
import Playlist from '@/layout/music/playlist/playlist';
import Button from '@/components/root/button';
import Localize from '@/langs';
import { array } from 'yup';

interface IViewProps extends UpdateStatusProps {
	onSubmit: (dataItem: FormUpdateSongs) => void;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[1024px]' title={'UPDATE_INFORMATION_PLAYLIST'} description={'UPDATE_INFORMATION_DESCRIPTION'}>
			<Form
				onSubmit={props.onSubmit}
				defaultValues={{
					songs: props.details.songs,
				}}
				validator={{
					songs: array().min(1).required(),
				}}
				render={(renderProps) => {
					return (
						<div className='flex flex-col gap-10 w-full'>
							<div className='flex bg-gradient-to-b from-[#232323] rounded-lg overflow-hidden w-full text-white py-4'>
								<Playlist classnameBlockLeft='w-1/2' classnameBlockRight='w-1/2' name='songs' />
							</div>
							<Button
								disabled={!renderProps.formState.isDirty || !renderProps.formState.isValid}
								type='submit'
								className='text-white rounded-[6px] h-14'>
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
