import Button from '@/components/root/button';
import Form from '@/components/root/form';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import IntroducePlaylist from '@/layout/music/playlist/introduce';
import Playlist from '@/layout/music/playlist/playlist';

const View = () => {
	return (
		<div className='pr-4 py-8'>
			<Form
				render={(renderProps) => {
					return (
						<Wrapper className='flex flex-col !gap-6'>
							<div className='flex justify-between items-center animate-translateRight'>
								<div className='leading-10 flex flex-col gap-2'>
									<div className='flex items-end gap-4'>
										<h1 className='text-5xl font-semibold'>{Localize('PLAYLIST_CREATE')}</h1>
									</div>
								</div>
							</div>
							<div className='flex flex-col h-full animate-translateRight'>
								<IntroducePlaylist />
								<Playlist />
							</div>
							<Button disabled={!renderProps.isValid} type='submit' className='text-white !rounded-md h-14 animate-translateRight'>
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
