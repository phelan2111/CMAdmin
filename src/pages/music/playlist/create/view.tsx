import Button from '@/components/root/button';
import Form from '@/components/root/form';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import IntroducePlaylist from '@/layout/music/playlist/introduce';
import Playlist from '@/layout/music/playlist/playlist';
import { FormCreatePlayList } from '../types';

const View = () => {
	return (
		<div className='pr-4 py-8'>
			<Form
				defaultValues={{
					namePlaylist: '',
					descriptionPlaylist: '',
					theme: '#000',
				}}
				onSubmit={(events) => {
					console.log('eventseventsevents', events);
				}}
				render={(renderProps) => {
					const valueCurrent: unknown = renderProps?.getValues() as unknown;
					return (
						<Wrapper className='flex flex-col !gap-6'>
							<div className='flex justify-between items-center animate-translateRight'>
								<div className='leading-10 flex flex-col gap-2'>
									<div className='flex items-end gap-4'>
										<h1 className='text-5xl font-semibold'>{Localize('PLAYLIST_CREATE')}</h1>
									</div>
								</div>
							</div>
							<div className='flex flex-col h-full animate-translateRight  bg-gradient-to-b from-[#232323] rounded-xl'>
								<IntroducePlaylist dataForm={valueCurrent as FormCreatePlayList} />
								<Playlist />
							</div>
							<Button disabled={!renderProps.formState} type='submit' className='text-white !rounded-md min-h-12 animate-translateRight'>
								{Localize('SUBMIT')}
							</Button>
						</Wrapper>
					);
				}}
			/>
		</div>
	);
};

export default View;
