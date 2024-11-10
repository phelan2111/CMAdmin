import Button from '@/components/root/button';
import Form from '@/components/root/form';
import TextAreaField from '@/components/root/inputs/textarea';
import Input from '@/components/ui/input/input';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import { DataFormCreateSinger } from '../types';
import { array, string } from 'yup';
import AvatarUploadRequestSong from '@/components/ui/upload/request/avatar/avatarSong';
import SingersSelect from '@/layout/music/song/singerSelect';

type IViewProps = {
	onSubmit: (dataItem: DataFormCreateSinger) => void;
};
function View(props: IViewProps) {
	return (
		<div className='pr-4 py-8'>
			<Form
				validator={{
					singerName: string().required('SINGER_NAME_REQUIRED'),
					singerDescription: string().required('SINGER_DESCRIPTION_REQUIRED'),
					genres: array().required('GENRES_REQUIRED'),
				}}
				onSubmit={props.onSubmit}
				render={(renderProps) => {
					return (
						<Wrapper className='flex flex-col !gap-6'>
							<div className='flex justify-between items-center animate-translateRight'>
								<div className='leading-10 flex flex-col gap-2'>
									<div className='flex items-end gap-4'>
										<h1 className='text-5xl font-semibold'>{Localize('DETAILS_ACCOUNT')}</h1>
									</div>
								</div>
							</div>
							<div className='animate-translateRight'>
								<div className='h-72'>
									<AvatarUploadRequestSong name='image' />
								</div>
								<div className='flex flex-col gap-8 pt-32 animate-translateRight w-full'>
									<div className='flex gap-6 relative'>
										<div className='flex flex-col gap-6 w-1/2 sticky top-0 h-fit'>
											<div className='flex flex-col gap-8 bg-white/10 p-8 rounded-xl'>
												<p className='text-3xl font-semibold'>{Localize('INTRODUCE')}</p>
												<div className='flex flex-col gap-4'>
													<Input required label='SONG_NAME' name='songName' />
													<TextAreaField
														className='!bg-white !rounded-lg'
														classNameTextArea='!text-primary_dark'
														required
														label='SONG_DESCRIPTION'
														name='songDescription'
													/>
												</div>
											</div>
											<div className='flex flex-col gap-8 bg-white/10 p-8 rounded-xl'>
												<p className='text-3xl font-semibold'>{Localize('ARTIST')}</p>
												<SingersSelect name='genres' />
											</div>
										</div>
										<div className='w-1/2 bg-white/10 rounded-xl p-8 flex flex-col gap-8'>
											<p className='text-3xl font-semibold'>{Localize('SET_UP')}</p>
											<SingersSelect className='w-full' name='genres' />
										</div>
									</div>
									<Button disabled={!renderProps.isValid} type='submit' className='text-white !rounded-md h-14'>
										{Localize('SUBMIT')}
									</Button>
								</div>
							</div>
						</Wrapper>
					);
				}}
			/>
		</div>
	);
}

export default View;
